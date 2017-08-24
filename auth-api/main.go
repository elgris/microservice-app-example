package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
	// ErrHttpGenericMessage that is returned in general case, details should be logged in such case
	ErrHttpGenericMessage = echo.NewHTTPError(http.StatusInternalServerError, "something went wrong, please try again later")

	// ErrWrongCredentials indicates that login attempt failed because of incorrect login or password
	ErrWrongCredentials = echo.NewHTTPError(http.StatusUnauthorized, "username or password is invalid")

	jwtSecret = "myfancysecret"

	allowedUsers = map[string]User{
		"admin_admin": User{
			Name: "admin",
			Role: "admin",
		},
		"peterf_12345": User{
			Name: "Peter F",
			Role: "user",
		},
		"john_doe": User{
			Name: "John Doe",
			Role: "user",
		},
		"janed_ddd": User{
			Name: "Jane Doe",
			Role: "user",
		},
	}
)

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Route => handler
	e.GET("/version", func(c echo.Context) error {
		return c.String(http.StatusOK, "Auth API, written in Go\n")
	})

	e.POST("/login", loginHandler)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}

type User struct {
	Name string
	Role string
}

func login(username, password string) (User, error) {
	userKey := fmt.Sprintf("%s_%s", username, password)
	u, ok := allowedUsers[userKey]
	if !ok {
		return u, ErrWrongCredentials // this is BAD, business logic layer must not return HTTP-specific errors
	}

	return u, nil
}

func loginHandler(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")

	user, err := login(username, password)
	if err != nil {
		if err != ErrWrongCredentials {
			log.Printf("could not authorize user '%s': %s", username, err.Error())
			return ErrHttpGenericMessage
		}

		return ErrWrongCredentials
	}
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = user.Name
	claims["role"] = user.Role
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		log.Printf("could not generate a JWT token: %s", err.Error())
		return ErrHttpGenericMessage
	}

	return c.JSON(http.StatusOK, map[string]string{
		"accessToken": t,
	})
}

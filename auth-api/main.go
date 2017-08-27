package main

import (
	"encoding/json"
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
)

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Route => handler
	e.GET("/version", func(c echo.Context) error {
		return c.String(http.StatusOK, "Auth API, written in Go\n")
	})

	e.POST("/login", loginHandler)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func loginHandler(c echo.Context) error {
	requestData := LoginRequest{}
	decoder := json.NewDecoder(c.Request().Body)
	if err := decoder.Decode(&requestData); err != nil {
		log.Printf("could not read credentials from POST body: %s", err.Error())
		return ErrHttpGenericMessage
	}

	user, err := login(requestData.Username, requestData.Password)
	if err != nil {
		if err != ErrWrongCredentials {
			log.Printf("could not authorize user '%s': %s", requestData.Username, err.Error())
			return ErrHttpGenericMessage
		}

		return ErrWrongCredentials
	}
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = user.ID
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

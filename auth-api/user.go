package main

import "fmt"

var allowedUsers = map[string]User{
	"admin_admin": User{
		Name: "admin",
		Role: "admin",
	},
	"peterf_12345": User{
		Name: "Peter F",
		Role: "user",
	},
	"johndoe_foofoofoo": User{
		Name: "John Doe",
		Role: "user",
	},
	"janed_ddd": User{
		Name: "Jane Doe",
		Role: "user",
	},
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

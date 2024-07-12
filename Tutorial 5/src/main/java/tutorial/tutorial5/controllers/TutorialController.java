package tutorial.tutorial5.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tutorial.tutorial5.model.User;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
public class TutorialController {

    private ArrayList<User> users = new ArrayList<>();

    // GET endpoint to retrieve all users
    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getUsers() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Users retrieved");
        response.put("success", true);
        response.put("users", users);
        return ResponseEntity.ok(response);
    }

    // GET endpoint to retrieve a specific user by ID
    @GetMapping("/user/{id}")
    public ResponseEntity<Map<String, Object>> getUser(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        User foundUser = findUserById(id);
        if (foundUser != null) {
            response.put("success", true);
            response.put("user", foundUser);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // POST endpoint to add a new user
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addUser(@RequestBody User newUser) {
        users.add(newUser);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User added");
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    // PUT endpoint to update an existing user by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        Map<String, Object> response = new HashMap<>();
        User existingUser = findUserById(id);
        if (existingUser != null) {
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setFirstName(updatedUser.getFirstName());
            response.put("message", "User updated");
            response.put("success", true);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // Helper method to find a user by ID
    private User findUserById(String id) {
        for (User user : users) {
            if (user.getId().equals(id)) {
                return user;
            }
        }
        return null;
    }
}

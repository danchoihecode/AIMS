package com.springboot.controller;

import java.util.UUID;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.springboot.model.entity.User;
import com.springboot.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springboot.model.response.UsersResponse;

@RestController
@RequestMapping("/admin")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/users/{uuid}")
  public ResponseEntity<User> getUserByUUID(@PathVariable UUID uuid) {
    try {
      User user = userService.findByUUID(uuid);
      return ResponseEntity.ok(user);
    } catch (Exception e) {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers() {
    try {
      List<User> users = userService.getAllUsers();
      return ResponseEntity.ok(users);
    } catch (Exception e) {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping("/users/create")
  public ResponseEntity<String> postMethodName(@RequestBody Map<String, Object> request) {
    try {
      String fullName = request.get("fullName").toString();
      String email = request.get("email").toString();
      String password = request.get("password").toString();
      String phone = request.get("phone").toString();
      String address = request.get("address").toString();
      Boolean isAdmin = Boolean.valueOf(request.get("isAdmin").toString());
      Boolean isManager = Boolean.valueOf(request.get("isManager").toString());
      Boolean blocked = false;

      User user = new User(fullName, email, password, phone, address, isAdmin, isManager, blocked);
      if (!user.isValid()) {
        return ResponseEntity.status(400).body("Invalid delivery information");
      }
      userService.save(user);
      return ResponseEntity.ok("User created successfully");
    } catch (Exception e) {
      e.printStackTrace();
			return ResponseEntity.status(400).body("Failed to create user");
    }
  }
  
  @PostMapping("/users/{uuid}/update")
  public ResponseEntity<String> updateUser(@PathVariable UUID uuid, @RequestBody Map<String, Object> request) {
    try {
      User user = userService.findByUUID(uuid);
      user.setFullName(request.get("fullName").toString());
      user.setEmail(request.get("email").toString());
      user.setPassword(request.get("password").toString());
      user.setPhone(request.get("phone").toString());
      user.setAddress(request.get("address").toString());
      user.setIsAdmin(Boolean.valueOf(request.get("isAdmin").toString()));
      user.setIsManager(Boolean.valueOf(request.get("isManager").toString()));

      if (!user.isValid()) {
          return ResponseEntity.status(400).body("Invalid user information");
      }

      userService.save(user);
      return ResponseEntity.ok("User updated successfully");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(400).body("Failed to update user");
    }
  }

  @PostMapping("/users/{uuid}/delete")
  public ResponseEntity<String> deleteUser(@PathVariable UUID uuid) {
    try {
      User user = userService.findByUUID(uuid);
      userService.delete(user);
      return ResponseEntity.ok("User deleted successfully");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(400).body("Failed to delete user");
    }
  }

  @PostMapping("/users/{uuid}/block")
  public ResponseEntity<String> blockUser(@PathVariable UUID uuid) {
    try {
      User user = userService.findByUUID(uuid);
      user.setBlocked(true);
      userService.save(user);
      return ResponseEntity.ok("User blocked successfully");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(400).body("Failed to block user");
    }
  }

  @PostMapping("/users/{uuid}/unblock")
  public ResponseEntity<String> unblockUser(@PathVariable UUID uuid) {
    try {
      User user = userService.findByUUID(uuid);
      user.setBlocked(false);
      userService.save(user);
      return ResponseEntity.ok("User unblocked successfully");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(400).body("Failed to unblock user");
    }
  }

  @PostMapping("/users/{uuid}/reset-password")
  public ResponseEntity<String> resetPassword(@PathVariable UUID uuid) {
    try {
      User user = userService.findByUUID(uuid);
      user.setPassword("password");
      userService.save(user);
      return ResponseEntity.ok("Password reset successfully");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(400).body("Failed to reset password");
    }
  }

  @PostMapping("/users/{uuid}/update-role")
  public ResponseEntity<String> updateRole(@PathVariable UUID uuid, @RequestBody Map<String, Object> request) {
    try {
      User user = userService.findByUUID(uuid);
      user.setIsAdmin(Boolean.valueOf(request.get("isAdmin").toString()));
      user.setIsManager(Boolean.valueOf(request.get("isManager").toString()));

      if (!user.isValid()) {
          return ResponseEntity.status(400).body("Invalid user information");
      }

      userService.save(user);
      return ResponseEntity.ok("User role updated successfully");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(400).body("Failed to update user role");
    }
  }
}

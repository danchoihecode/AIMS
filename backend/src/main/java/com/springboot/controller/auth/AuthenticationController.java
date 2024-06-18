package com.springboot.controller.auth;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.dto.LoginResponse;
import com.springboot.model.dto.LoginUser;
import com.springboot.model.entity.User;
import com.springboot.repository.UserRepository;
import com.springboot.service.auth.AuthenticationService;
import com.springboot.service.auth.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	private final JwtService jwtService;

	private final AuthenticationService authenticationService;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
		this.jwtService = jwtService;
		this.authenticationService = authenticationService;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginUser loginUser) {
		User authenticatedUser = authenticationService.authenticate(loginUser);

		String jwtToken = jwtService.generateToken(authenticatedUser);
		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(jwtToken);
		loginResponse.setExpiresIn(jwtService.getExpirationTime());
		loginResponse.setAdmin(authenticatedUser.getIsAdmin());
		loginResponse.setManager(authenticatedUser.getIsManager());

		return ResponseEntity.ok(loginResponse);
	}

	@PostMapping("/change-password")
	public ResponseEntity<?> changePassword(@RequestBody Map<String, String> requestBody) {
		String token = requestBody.get("token");
		String newPassword = requestBody.get("newPassword");
		String email = jwtService.extractUsername(token);

		Optional<User> optionalUser = userRepository.findByEmail(email);
		if (!optionalUser.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
		} else {
			User user = optionalUser.get();
			String hashedPassword = passwordEncoder.encode(newPassword);
			user.setPassword(hashedPassword);
			userRepository.save(user);

			return ResponseEntity.ok("Password changed successfully");
		}
	}

}

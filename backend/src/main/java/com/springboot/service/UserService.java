package com.springboot.service;

import java.util.UUID;
import java.util.List;
import java.util.Comparator;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.springboot.model.entity.User;
import com.springboot.repository.UserRepository;
import com.springboot.model.response.UserListResponse;
import com.springboot.model.response.UserResponse;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User findByUUID(UUID id) throws Exception {
    return userRepository.findById(id)
                         .orElseThrow(() -> new Exception("User not found"));
  }

  public UserResponse findByUUIDWithFormated(UUID id) throws Exception {
    User user = userRepository.findById(id)
                              .orElseThrow(() -> new Exception("User not found"));
    return new UserResponse(
      user.getId(),
      user.getFullName(),
      user.getEmail(),
      user.getPhone(),
      user.getAddress(),
      user.getIsAdmin(),
      user.getIsManager(),
      user.getBlocked()
    );
  }

  public void save(User user) {
    userRepository.save(user);
  }

  public void delete(User user) {
    userRepository.delete(user);
  }

  public List<UserListResponse> getAllUsers() {
    return userRepository.findAll().stream()
      .sorted(Comparator.comparing(User::getFullName))
      .map(user -> new UserListResponse(
          user.getId(), user.getFullName(), user.getEmail(), user.getIsAdmin(), user.getIsManager(), user.getBlocked())
      ).collect(Collectors.toList());
  }
}

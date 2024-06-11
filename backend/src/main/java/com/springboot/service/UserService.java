package com.springboot.service;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.springboot.model.entity.User;
import com.springboot.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User findByUUID(UUID id) throws Exception {
    return userRepository.findById(id)
                         .orElseThrow(() -> new Exception("User not found"));
  }

  public void save(User user) {
    userRepository.save(user);
  }

  public void delete(User user) {
    userRepository.delete(user);
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }
}

package com.springboot.model.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserListResponse {
  private UUID id;
  private String fullName;
  private String email;
  private Boolean isAdmin;
  private Boolean isManager;
  private Boolean blocked;
}

package com.springboot.model.entity;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "user_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Size(max = 100)
	@NotNull
	@Column(name = "full_name", nullable = false, length = 100)
	private String fullName;

	@Size(max = 100)
	@NotNull
	@Column(name = "email", nullable = false, length = 100)
	private String email;

	@NotNull
	@Column(name = "password", nullable = false, length = Integer.MAX_VALUE)
	private String password;

	@Column(name = "phone")
	private String phone;
	@Column(name = "address")
	private String address;

	@ColumnDefault("false")
	@Column(name = "is_admin")
	private Boolean isAdmin;

	@ColumnDefault("false")
	@Column(name = "is_manager")
	private Boolean isManager;

	@ColumnDefault("false")
	@Column(name = "blocked")
	private Boolean blocked;

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
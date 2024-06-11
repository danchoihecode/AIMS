package com.springboot.model.response;

import com.springboot.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersResponse {
    private List<UserDTO> allUsers;

    public static UsersResponse fromUsers(List<User> users) {
        List<UserDTO> userDTOs = users.stream()
            .map(UserDTO::new)
            .collect(Collectors.toList());
        return new UsersResponse(userDTOs);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserDTO {
        private UUID id;
        private String fullName;
        private String email;
        private String phone;
        private String address;
        private Boolean isAdmin;
        private Boolean isManager;
        private Boolean blocked;

        public UserDTO(User user) {
            this.id = user.getId();
            this.fullName = user.getFullName();
            this.email = user.getEmail();
            this.phone = user.getPhone();
            this.address = user.getAddress();
            this.isAdmin = user.getIsAdmin();
            this.isManager = user.getIsManager();
            this.blocked = user.getBlocked();
        }
    }
}

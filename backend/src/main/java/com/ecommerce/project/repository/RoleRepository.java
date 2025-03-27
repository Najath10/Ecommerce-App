package com.ecommerce.project.repository;

import com.ecommerce.project.config.AppRole;
import com.ecommerce.project.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(AppRole appRole);
}
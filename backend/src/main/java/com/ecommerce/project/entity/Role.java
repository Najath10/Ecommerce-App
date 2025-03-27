package com.ecommerce.project.entity;

import com.ecommerce.project.config.AppRole;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id", nullable = false)
    private Long roleId;

    @ToString.Exclude
    @Enumerated(EnumType.STRING)
    @Column(name = "role_name", nullable = false)
    private AppRole roleName;

    public Role(AppRole roleName) {
        this.roleName = roleName;
    }
}
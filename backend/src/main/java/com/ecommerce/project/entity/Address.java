package com.ecommerce.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id", nullable = false)
    private Long addressId;

    @NotBlank
    @Size(min = 3)
    private String street;

    @NotBlank
    private String buildingName;

    @NotBlank
    private String city;

    @NotBlank
    private String state;

    @NotBlank
    @Size(min = 5,message ="Pincode Must Contain 6 characters" )
    private String pincode;

    @NotBlank
    private String country;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user ;


    public Address(String street, String buildingName, String city, String state, String country, String pincode) {
        this.street = street;
        this.buildingName = buildingName;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
    }
}
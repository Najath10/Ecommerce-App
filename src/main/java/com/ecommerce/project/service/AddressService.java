package com.ecommerce.project.service;


import com.ecommerce.project.entity.User;
import com.ecommerce.project.payload.AddressDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO, User user);

    List<AddressDTO> getAddresses();

    AddressDTO getAddressesByID(Long addressId);

    List<AddressDTO> getAddressesByUser(User user);

    AddressDTO updateAddressesByID(Long addressId, @Valid AddressDTO addressDTO);

    String deleteAddress(Long addressId);
}

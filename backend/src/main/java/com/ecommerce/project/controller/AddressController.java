package com.ecommerce.project.controller;

import com.ecommerce.project.entity.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.service.serviceImpl.AddressServiceimpl;
import com.ecommerce.project.util.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddressController {
    @Autowired
    private AuthUtil authUtil;
    private AddressServiceimpl addressService;

    public AddressController(AddressServiceimpl addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> createAddress(@Valid @RequestBody AddressDTO addressDTO) {
        User user = authUtil.loggedInUser();
        AddressDTO savedAddressDTO = addressService.createAddress(addressDTO,user);
        return new ResponseEntity<>(savedAddressDTO, HttpStatus.CREATED);
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<AddressDTO>> getAllAddresses() {
        List<AddressDTO> addressListDTO=addressService.getAddresses();
        return new ResponseEntity<>(addressListDTO,HttpStatus.OK);
    }
    @GetMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddressesByID(
                            @PathVariable Long addressId
    ) {
        AddressDTO addressDTO =addressService.getAddressesByID(addressId);
        return new ResponseEntity<>(addressDTO,HttpStatus.OK);
    }

    @GetMapping("/addresses/users")
    public ResponseEntity <List<AddressDTO>> getAddressesByUser(
    ) {
        User user = authUtil.loggedInUser();
        List<AddressDTO> addressDTOList =addressService.getAddressesByUser(user);
        return new ResponseEntity<>(addressDTOList,HttpStatus.OK);
    }
    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> updateAddressById(
            @PathVariable Long addressId,
            @Valid @RequestBody AddressDTO addressDTO
    ){
        AddressDTO addressesByID=addressService.updateAddressesByID(addressId,addressDTO);
        return new ResponseEntity<>(addressesByID,HttpStatus.OK);
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<?> deleteAddressById( @PathVariable Long addressId){
        String status= addressService.deleteAddress(addressId);
        return new ResponseEntity<>("Address Deleted Successfully",HttpStatus.OK);
    }
}

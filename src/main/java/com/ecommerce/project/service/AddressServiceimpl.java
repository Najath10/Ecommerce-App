package com.ecommerce.project.service;

import com.ecommerce.project.entity.Address;
import com.ecommerce.project.entity.User;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.repository.AddressRepository;
import com.ecommerce.project.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressServiceimpl implements AddressService {
    @Autowired
    private ModelMapper modelMapper;

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    public AddressServiceimpl(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        Address address = modelMapper.map(addressDTO, Address.class);

        List<Address> addressList= user.getAddresses();
        addressList.add(address);
        user.setAddresses(addressList);

        address.setUser(user);
        Address savedAddress = addressRepository.save(address);
        return modelMapper.map(savedAddress, AddressDTO.class);
        }

    @Override
    public List<AddressDTO> getAddresses() {
        List<Address> addressList=addressRepository.findAll();
        return  addressList.stream().map(
                address -> modelMapper.map(address, AddressDTO.class))
                .toList();
    }

    @Override
    public AddressDTO getAddressesByID(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));
        return modelMapper.map(address, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAddressesByUser(User user) {
       List<Address> addressList = user.getAddresses();
       return addressList.stream().map(
               address -> modelMapper.map(address, AddressDTO.class))
               .toList();
    }

    @Override
    public AddressDTO updateAddressesByID(Long addressId, AddressDTO addressDTO) {
        Address addressFromDb= addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));
        addressFromDb.setCountry(addressDTO.getCountry());
        addressFromDb.setCity(addressDTO.getCity());
        addressFromDb.setState(addressDTO.getState());
        addressFromDb.setBuildingName(addressDTO.getBuildingName());
        addressFromDb.setStreet(addressDTO.getStreet());
        addressFromDb.setPincode(addressDTO.getPincode());
        Address updatedAddress = addressRepository.save(addressFromDb);
        User user = addressFromDb.getUser();
        user.getAddresses().removeIf(addresses -> addresses.getAddressId().equals(addressId));
        user.getAddresses().add(addressFromDb);
        userRepository.save(user);
        return modelMapper.map(updatedAddress, AddressDTO.class);
    }

    @Override
    public String deleteAddress(Long addressId) {
        Address addressFromDb= addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));
        User user = addressFromDb.getUser();
        user.getAddresses().removeIf(addresses -> addresses.getAddressId().equals(addressId));
        userRepository.save(user);
        addressRepository.delete(addressFromDb);

        return "Address Deleted Successfully with ID: " + addressId;
    }
}


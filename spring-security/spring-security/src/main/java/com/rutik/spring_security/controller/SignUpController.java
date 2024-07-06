package com.rutik.spring_security.controller;


import com.rutik.spring_security.common.ResponseReturn;
import com.rutik.spring_security.dto.CustomerDto;
import com.rutik.spring_security.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class SignUpController {

    public final AuthService g_objAuthService;

    @PostMapping("/sighupuser")
    public ResponseEntity<?> signupCustomer(@RequestBody CustomerDto p_CustomerDto) {
        try {
            boolean isUserCreated = g_objAuthService.createCustomer(p_CustomerDto);
            if (isUserCreated) {
                return ResponseEntity.status(HttpStatus.CREATED).body("Customer Created Successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create customer");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(new ResponseReturn("error", ex.getLocalizedMessage(), null),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

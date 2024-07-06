package com.rutik.spring_security.controller;

import com.rutik.spring_security.dto.HelloResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class HelloController {
    @GetMapping("/hello")
    public HelloResponse hello(){
        System.out.println("Start");
        return new HelloResponse("Hello from Authorized Api request ");
    }
}

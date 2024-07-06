package com.rutik.spring_security.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ResponseReturn<T> {
    private String type;
    private String message;
    private List<?> list;
    //	private Class<T> object;
    private Integer id;
    private T object;
    public ResponseReturn(String type, String message, List<?> list) {
        this.type = type;
        this.message = message;
        this.list = list;
    }
    public ResponseReturn(String type, String message, List<?> list, T object) {
        this.type = type;
        this.message = message;
        this.list = list;
        this.object = object;
    }
}

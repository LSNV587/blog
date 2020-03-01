package com.hrhforever.service.impl;

import com.hrhforever.entity.User;
import com.hrhforever.mapper.UserMapper;
import com.hrhforever.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private UserMapper userMapper;
    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }
}

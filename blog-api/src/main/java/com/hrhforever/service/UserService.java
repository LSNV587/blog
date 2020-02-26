package com.hrhforever.service;

import java.util.List;

import com.hrhforever.entity.User;

/**
 * @author hrhforever
 * <p>
 * 2018年1月23日
 */
public interface UserService {

    List<User> findAll();

    User getUserByAccount(String account);

    User getUserById(Long id);

    Long saveUser(User user);

    Long updateUser(User user);

    void deleteUserById(Long id);
}

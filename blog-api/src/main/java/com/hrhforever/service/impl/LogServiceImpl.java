package com.hrhforever.service.impl;

import com.hrhforever.entity.Log;
import com.hrhforever.repository.LogRepository;
import com.hrhforever.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author hrhforever
 * <p>
 * 2018年4月18日
 */
@Service
public class LogServiceImpl implements LogService {

    @Autowired
    private LogRepository logRepository;

    @Override
    public Integer saveLog(Log log) {
        return logRepository.save(log).getId();
    }
}

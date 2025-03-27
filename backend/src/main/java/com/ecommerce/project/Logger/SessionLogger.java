package com.ecommerce.project.Logger;
import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class SessionLogger implements HttpSessionListener {
    private static final Logger logger = LoggerFactory.getLogger(SessionLogger.class);

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        logger.info("Session Created: " + event.getSession().getId());
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        logger.info("Session Destroyed: " + event.getSession().getId());
    }
}

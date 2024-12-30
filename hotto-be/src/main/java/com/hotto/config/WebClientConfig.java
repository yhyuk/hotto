package com.hotto.config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@Configurable
public class WebClientConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.create("https://www.dhlottery.co.kr");
    }
}

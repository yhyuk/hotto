package com.hotto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.hotto") // com.hotto 패키지 아래의 모든 클래스 스캔
public class HottoApplication {

	public static void main(String[] args) {
		SpringApplication.run(HottoApplication.class, args);
	}

}

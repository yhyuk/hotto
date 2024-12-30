package com.hotto.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotto.dto.LottoPreviousResponse;
import com.hotto.dto.LottoResponse;
import com.hotto.util.LottoUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class LottoService {

    private static final String LOTTO_API_URL = "/common.do?method=getLottoNumber&drwNo=";
    private WebClient webClient;


    public LottoService() {
        this.webClient = WebClient.create("https://www.dhlottery.co.kr");
    }

    /**
     * 랜덤 로또 번호 추출
     */
    public LottoResponse getLottoNumbers() {
        List<Integer> numbers = new Random().ints(1, 45)
                .distinct()
                .limit(6)
                .sorted()
                .boxed()
                .toList();

        return new LottoResponse(numbers);
    }

    /**
     * 직전 회차 당첨 번호
     */
    public LottoPreviousResponse getPreviousDraw() {
        // 현재 회차 계산
        int drawNumber = LottoUtil.calculateCurrentDrawNumber(LocalDate.now());

        // WebClient에서 응답을 String 형태로 먼저 받음
        String responseBody = webClient
                .get()
                .uri("/common.do?method=getLottoNumber&drwNo=" + drawNumber)
                .retrieve()
                .bodyToMono(String.class) // 응답을 String으로 받기
                .block(); // 동기 처리

        System.out.println("response 값 확인 : " + responseBody);

        // 받은 응답이 실제로 JSON 형식인 경우만 파싱을 시도
        if (responseBody != null && responseBody.startsWith("{")) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.readValue(responseBody, LottoPreviousResponse.class);
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("로또 데이터 파싱 실패", e);
            }
        } else {
            throw new IllegalArgumentException("올바른 JSON 형식의 응답을 받지 못했습니다.");
        }
    }
}

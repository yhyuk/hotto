package com.hotto.service;

import com.hotto.dto.LottoResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class LottoService {

    public LottoResponse getLottoNumbers() {
        List<Integer> numbers = new Random().ints(1, 45)
                .distinct()
                .limit(6)
                .sorted()
                .boxed()
                .toList();

        return new LottoResponse(numbers);
    }
}

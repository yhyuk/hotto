package com.hotto.controller;

import com.hotto.dto.LottoResponse;
import com.hotto.service.LottoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/lotto")
@RestController
public class LottoController {

    private final LottoService lottoService;

    @GetMapping
    public ResponseEntity<LottoResponse> getLottoNumbers() {
        return ResponseEntity.ok(lottoService.getLottoNumbers());
    }
}
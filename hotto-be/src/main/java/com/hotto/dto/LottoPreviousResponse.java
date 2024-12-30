package com.hotto.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record LottoPreviousResponse(
        @JsonProperty("totSellamnt") long totalSellAmount,
        @JsonProperty("returnValue") String returnValue,
        @JsonProperty("drwNoDate") String drawDate,
        @JsonProperty("firstWinamnt") long firstWinAmount,
        @JsonProperty("drwtNo1") int number1,
        @JsonProperty("drwtNo2") int number2,
        @JsonProperty("drwtNo3") int number3,
        @JsonProperty("drwtNo4") int number4,
        @JsonProperty("drwtNo5") int number5,
        @JsonProperty("drwtNo6") int number6,
        @JsonProperty("bnusNo") int bonusNumber,
        @JsonProperty("firstPrzwnerCo") int firstPrizeWinnerCount,
        @JsonProperty("firstAccumamnt") long firstAccumulatedAmount,
        @JsonProperty("drwNo") int drawNumber
) {}


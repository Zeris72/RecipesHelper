package com.example.recipieHelper.model;

public class RatingData{
        private Double average;
        private int quantityOfRatings;

    public RatingData(Double average, int quantityOfRatings) {
        this.average = average;
        this.quantityOfRatings = quantityOfRatings;
    }

    public Double getAverage() {
            return average;
        }

        public void setAverage(Double average) {
            this.average = average;
        }

        public int getQuantityOfRatings() {
            return quantityOfRatings;
        }

        public void setQuantityOfRatings(int quantityOfRatings) {
            this.quantityOfRatings = quantityOfRatings;
        }
}

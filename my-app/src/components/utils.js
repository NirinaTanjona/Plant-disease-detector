export const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
}

export const compareConfidence = (predict1, predict2) => predict1.confidence > predict2.confidence ? -1 : 1



export function calculateRiskLevel(QuestionList) {
    let totalScore = 0;
    // 计算总分
    QuestionList.forEach(question => {
        // 找到选中的答案 
        const selectedAnswer = question.answers.find(answer => answer.answer === question.selectedAnswer);
        // 如果有选中的答案，则累加分数 
        if (selectedAnswer){
            totalScore += selectedAnswer.score; 
        }
    });

    // 根据总分确定投资风险等级
    if (totalScore >= 160) {
        return { level: 5, description: "激进型" };
    } else if (totalScore >= 120) {
        return { level: 4, description: "进取型" };
    } else if (totalScore >= 80) {
        return { level: 3, description: "平衡型" };
    } else if (totalScore >= 40) {
        return { level: 2, description: "稳健型" };
    } else {
        return { level: 1, description: "谨慎型" };
    }
}
'use client';

import { useState } from 'react';

type InterviewType = 'job' | 'admission';

interface QuestionGeneratorProps {
  interviewType: InterviewType;
  onQuestionGenerated: (question: string) => void;
  currentQuestion: string;
}

// 면접 질문 데이터베이스
const jobQuestions = [
  '자기소개를 해주세요.',
  '우리 회사에 지원한 이유는 무엇인가요?',
  '본인의 강점과 약점은 무엇인가요?',
  '5년 후 자신의 모습은 어떨 것 같나요?',
  '팀워크가 중요한 상황에서 갈등이 발생했다면 어떻게 해결하시겠어요?',
  '스트레스를 받을 때 어떻게 대처하시나요?',
  '이 직무에서 가장 중요하다고 생각하는 역량은 무엇인가요?',
  '최근에 읽은 책이나 배운 것이 있나요?',
  '왜 이 분야를 선택하게 되었나요?',
  '실패 경험이 있다면 그것을 통해 무엇을 배웠나요?',
];

const admissionQuestions = [
  '자기소개를 해주세요.',
  '우리 대학에 지원한 이유는 무엇인가요?',
  '이 전공을 선택한 이유는 무엇인가요?',
  '대학생활 중 가장 중요하게 생각하는 것은 무엇인가요?',
  '입학 후 어떤 활동을 하고 싶나요?',
  '최근에 관심을 가지고 있는 사회 이슈는 무엇인가요?',
  '자신의 인생 목표는 무엇인가요?',
  '고등학교 시절 가장 기억에 남는 활동은 무엇인가요?',
  '리더십을 발휘했던 경험이 있다면 말씀해주세요.',
  '어려운 상황을 극복했던 경험이 있다면 말씀해주세요.',
];

export default function QuestionGenerator({
  interviewType,
  onQuestionGenerated,
  currentQuestion,
}: QuestionGeneratorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const questions = interviewType === 'job' ? jobQuestions : admissionQuestions;

  const categories = interviewType === 'job' 
    ? ['자기소개', '지원동기', '강점/약점', '직무역량', '상황대응']
    : ['자기소개', '지원동기', '전공관심', '인성/가치관', '활동경험'];

  const handleGenerateQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    onQuestionGenerated(randomQuestion);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // 카테고리별로 적절한 질문 선택
    const categoryQuestions: Record<string, string[]> = {
      '자기소개': [questions[0]],
      '지원동기': [questions[1]],
      '강점/약점': [questions[2]],
      '직무역량': [questions[6], questions[8]],
      '상황대응': [questions[4], questions[5], questions[9]],
      '전공관심': [questions[2]],
      '인성/가치관': [questions[6]],
      '활동경험': [questions[7], questions[8], questions[9]],
    };

    const categoryQ = categoryQuestions[category] || questions;
    const randomQ = categoryQ[Math.floor(Math.random() * categoryQ.length)];
    onQuestionGenerated(randomQ);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          📝 면접 질문 연습
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          다양한 면접 질문을 연습하고 답변을 준비해보세요.
        </p>
      </div>

      {/* 카테고리 선택 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          질문 카테고리 선택
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 랜덤 질문 생성 */}
      <div>
        <button
          onClick={handleGenerateQuestion}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
        >
          🎲 랜덤 질문 생성
        </button>
      </div>

      {/* 현재 질문 표시 */}
      {currentQuestion && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <div className="text-2xl">❓</div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentQuestion}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 질문 목록 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          자주 나오는 질문들
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {questions.map((question, index) => (
            <button
              key={index}
              onClick={() => onQuestionGenerated(question)}
              className="text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">{question}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


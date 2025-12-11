'use client';

import { useState } from 'react';

type InterviewType = 'job' | 'admission';

interface AnswerHelperProps {
  question: string;
  interviewType: InterviewType;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export default function AnswerHelper({
  question,
  interviewType,
  userAnswer,
  onAnswerChange,
}: AnswerHelperProps) {
  const [showTips, setShowTips] = useState(false);

  // 답변 작성 가이드
  const getAnswerGuide = (q: string): string[] => {
    const guides: Record<string, string[]> = {
      '자기소개': [
        '1. 간단한 인사와 기본 정보 (이름, 학교/회사)',
        '2. 핵심 경력/경험 (2-3가지)',
        '3. 지원한 이유나 관심사 연결',
        '4. 마무리 인사',
      ],
      '지원동기': [
        '1. 회사/대학에 대한 구체적인 조사 내용',
        '2. 자신의 목표와의 연관성',
        '3. 자신이 기여할 수 있는 점',
        '4. 진정성 있는 표현',
      ],
      '강점/약점': [
        '1. 강점: 구체적인 사례와 함께 설명',
        '2. 약점: 인정하고 개선 노력 설명',
        '3. 약점을 강점으로 전환한 경험',
        '4. 지속적인 자기계발 의지',
      ],
    };

    // 질문에서 키워드 찾기
    for (const key in guides) {
      if (q.includes(key)) {
        return guides[key];
      }
    }

    return [
      '1. 질문에 직접적으로 답변',
      '2. 구체적인 사례나 경험 제시',
      '3. 자신의 생각과 가치관 표현',
      '4. 긍정적이고 미래지향적인 마무리',
    ];
  };

  const answerGuide = getAnswerGuide(question);

  // 답변 체크리스트
  const checkAnswerQuality = (answer: string): { good: string[]; improve: string[] } => {
    const good: string[] = [];
    const improve: string[] = [];

    if (answer.length > 100) {
      good.push('적절한 길이의 답변');
    } else {
      improve.push('답변을 더 구체적으로 작성해보세요 (100자 이상 권장)');
    }

    if (answer.includes('예') || answer.includes('경험') || answer.includes('했') || answer.includes('했던')) {
      good.push('구체적인 경험 언급');
    } else {
      improve.push('구체적인 경험이나 사례를 추가해보세요');
    }

    if (answer.length > 0 && answer.split('.').length > 2) {
      good.push('구조화된 답변');
    } else if (answer.length > 0) {
      improve.push('답변을 문단으로 나누어 구조화해보세요');
    }

    return { good, improve };
  };

  const quality = checkAnswerQuality(userAnswer);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ✍️ 답변 작성 도우미
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          질문에 대한 답변을 작성하고 피드백을 받아보세요.
        </p>
      </div>

      {/* 답변 작성 영역 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          질문: <span className="font-semibold text-gray-900 dark:text-white">{question}</span>
        </label>
        <textarea
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="여기에 답변을 작성해주세요..."
          className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {userAnswer.length}자
        </div>
      </div>

      {/* 답변 가이드 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <button
          onClick={() => setShowTips(!showTips)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            💡 답변 작성 가이드
          </h3>
          <svg
            className={`w-5 h-5 transition-transform ${showTips ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showTips && (
          <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {answerGuide.map((guide, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{guide}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 답변 품질 체크 */}
      {userAnswer.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">답변 품질 체크</h3>
          
          {quality.good.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-medium text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                잘한 점
              </h4>
              <ul className="space-y-1 text-sm text-green-700 dark:text-green-400">
                {quality.good.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {quality.improve.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                개선할 점
              </h4>
              <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-400">
                {quality.improve.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span>!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 답변 작성 팁 */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
          📌 답변 작성 팁
        </h3>
        <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-400">
          <li>• STAR 기법 활용: 상황(Situation), 작업(Task), 행동(Action), 결과(Result)</li>
          <li>• 구체적인 숫자나 사례를 들어 설명하세요</li>
          <li>• 자신의 경험과 연결하여 진정성 있게 답변하세요</li>
          <li>• 긍정적이고 미래지향적인 톤을 유지하세요</li>
          <li>• 1-2분 분량으로 말할 수 있는 길이로 작성하세요</li>
        </ul>
      </div>
    </div>
  );
}


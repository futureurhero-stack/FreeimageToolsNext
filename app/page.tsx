'use client';

import { useState } from 'react';
import InterviewTypeSelector from './components/InterviewTypeSelector';
import QuestionGenerator from './components/QuestionGenerator';
import AnswerHelper from './components/AnswerHelper';
import InterviewTips from './components/InterviewTips';

type InterviewType = 'job' | 'admission' | null;

export default function Home() {
  const [selectedType, setSelectedType] = useState<InterviewType>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 헤더 */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 면접 도우미
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            취업 면접과 입시 면접을 위한 종합 준비 도구
          </p>
        </header>

        {/* 면접 타입 선택 */}
        {!selectedType && (
          <InterviewTypeSelector onSelect={setSelectedType} />
        )}

        {/* 메인 콘텐츠 */}
        {selectedType && (
          <div className="space-y-8">
            {/* 뒤로가기 버튼 */}
            <button
              onClick={() => {
                setSelectedType(null);
                setCurrentQuestion('');
                setUserAnswer('');
              }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              다른 면접 타입 선택
            </button>

            {/* 질문 생성 및 연습 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <QuestionGenerator
                interviewType={selectedType}
                onQuestionGenerated={setCurrentQuestion}
                currentQuestion={currentQuestion}
              />
            </div>

            {/* 답변 작성 도움 */}
            {currentQuestion && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <AnswerHelper
                  question={currentQuestion}
                  interviewType={selectedType}
                  userAnswer={userAnswer}
                  onAnswerChange={setUserAnswer}
                />
              </div>
            )}

            {/* 면접 팁 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <InterviewTips interviewType={selectedType} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

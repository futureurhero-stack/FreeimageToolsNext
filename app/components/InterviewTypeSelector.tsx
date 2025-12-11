'use client';

type InterviewType = 'job' | 'admission';

interface InterviewTypeSelectorProps {
  onSelect: (type: InterviewType) => void;
}

export default function InterviewTypeSelector({ onSelect }: InterviewTypeSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* 취업 면접 카드 */}
      <div
        onClick={() => onSelect('job')}
        className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">💼</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            취업 면접
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            기업 면접 준비를 위한 질문 연습과 답변 작성 도움
          </p>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              자기소개서 기반 질문
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              직무 관련 질문
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              상황별 질문 연습
            </div>
          </div>
        </div>
      </div>

      {/* 입시 면접 카드 */}
      <div
        onClick={() => onSelect('admission')}
        className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-500"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            입시 면접
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            대학 입시 면접 준비를 위한 질문 연습과 답변 작성 도움
          </p>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              지원 동기 질문
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              전공 관련 질문
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              인성 및 가치관 질문
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';

type InterviewType = 'job' | 'admission';

interface InterviewTipsProps {
  interviewType: InterviewType;
}

export default function InterviewTips({ interviewType }: InterviewTipsProps) {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const jobTips = [
    {
      title: '면접 전 준비사항',
      icon: '📋',
      content: [
        '회사와 직무에 대한 철저한 조사 (사업 분야, 최근 뉴스, 경쟁사 등)',
        '자기소개서 내용을 완벽히 숙지하고 예상 질문 준비',
        '포트폴리오나 프로젝트 경험 정리',
        '면접 장소와 시간 확인, 여유있게 도착',
        '적절한 복장 준비 (기업 문화에 맞는 정장 또는 비즈니스 캐주얼)',
      ],
    },
    {
      title: '면접 중 주의사항',
      icon: '💼',
      content: [
        '명확하고 자신감 있는 목소리로 답변',
        '눈 맞춤을 유지하며 적절한 표정 관리',
        '질문을 끝까지 듣고 생각한 후 답변',
        '구체적인 사례와 경험을 들어 설명',
        '모르는 질문은 솔직하게 말하고 학습 의지 표현',
      ],
    },
    {
      title: '답변 구성 방법',
      icon: '🗣️',
      content: [
        'STAR 기법 활용: 상황-작업-행동-결과 순서로 설명',
        '1분 자기소개는 핵심만 간결하게',
        '강점은 구체적 사례와 함께, 약점은 개선 노력과 함께',
        '지원 동기는 회사와 자신의 연결점을 명확히',
        '질문이 끝나면 "감사합니다"로 마무리',
      ],
    },
    {
      title: '면접 후 팔로우업',
      icon: '📧',
      content: [
        '면접 후 24시간 내 감사 이메일 발송',
        '면접에서 약속한 추가 자료가 있다면 제출',
        '결과를 기다리는 동안 다른 기회도 준비',
        '면접 경험을 기록하여 다음 면접에 활용',
      ],
    },
  ];

  const admissionTips = [
    {
      title: '면접 전 준비사항',
      icon: '📚',
      content: [
        '지원 대학과 전공에 대한 깊이 있는 조사',
        '자기소개서와 학업계획서 내용 완벽 숙지',
        '최근 사회 이슈와 전공 관련 뉴스 파악',
        '고등학교 활동 경험 정리 (동아리, 봉사, 수상 등)',
        '면접 장소와 시간 확인, 여유있게 도착',
        '적절한 복장 준비 (단정한 정장 또는 교복)',
      ],
    },
    {
      title: '면접 중 주의사항',
      icon: '🎓',
      content: [
        '교수님께 존댓말 사용, 정중한 태도 유지',
        '질문을 정확히 이해하고 생각한 후 답변',
        '자신의 생각과 가치관을 솔직하게 표현',
        '모르는 질문은 겸손하게 인정하고 학습 의지 표현',
        '긍정적이고 미래지향적인 답변',
      ],
    },
    {
      title: '답변 구성 방법',
      icon: '💭',
      content: [
        '지원 동기는 대학의 특성과 자신의 목표 연결',
        '전공 선택 이유는 구체적 경험과 함께 설명',
        '활동 경험은 자신의 성장과 연결하여 설명',
        '인생 목표는 구체적이고 실현 가능하게',
        '사회 이슈에 대한 의견은 균형잡힌 시각으로',
      ],
    },
    {
      title: '면접 후 팔로우업',
      icon: '📝',
      content: [
        '면접에서 언급한 약속사항 확인',
        '면접 경험을 기록하여 정리',
        '결과를 기다리는 동안 다른 대학 준비도 계속',
        '면접에서 배운 점을 다음 면접에 활용',
      ],
    },
  ];

  const tips = interviewType === 'job' ? jobTips : admissionTips;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          💡 면접 성공 팁
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {interviewType === 'job' 
            ? '취업 면접을 성공적으로 준비하기 위한 실전 팁들'
            : '입시 면접을 성공적으로 준비하기 위한 실전 팁들'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setExpandedTip(expandedTip === index ? null : index)}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{tip.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tip.title}
              </h3>
              <svg
                className={`w-5 h-5 ml-auto transition-transform ${
                  expandedTip === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {expandedTip === index && (
              <ul className="space-y-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
                {tip.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* 추가 팁 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-3">🌟 면접 성공의 핵심</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>진정성:</strong> 자신만의 이야기를 솔직하고 진심으로 전달하세요.
          </p>
          <p>
            <strong>준비:</strong> 철저한 사전 준비가 자신감을 만듭니다.
          </p>
          <p>
            <strong>긍정성:</strong> 어려운 질문도 긍정적으로 전환하여 답변하세요.
          </p>
          <p>
            <strong>소통:</strong> 면접관과의 대화를 즐기며 자연스럽게 소통하세요.
          </p>
        </div>
      </div>
    </div>
  );
}


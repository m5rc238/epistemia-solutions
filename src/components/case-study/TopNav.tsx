import React from 'react';
import { BarChart3, BookOpen, Layers, MessageSquare } from 'lucide-react';
import { CaseStudyTab } from '../../types/epistemia';

interface TopNavProps {
  activeTab: CaseStudyTab;
  onSelectTab: (tab: CaseStudyTab) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activeTab, onSelectTab }) => {
  const navItems: Array<{
    id: CaseStudyTab;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'case-study',
      label: 'Case Study & 12-User Cohort',
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: 'lab',
      label: '7 Fault Lines UX Lab',
      icon: <Layers className="h-4 w-4" />,
    },
    {
      id: 'chatbot',
      label: 'Chatbot Prototype',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: 'results',
      label: '12-User Results & Analysis',
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#E6E1D6] bg-[#FAF8F4]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C1B18] font-mono-tech text-xs font-semibold text-[#FAF8F4]">
            7F
          </div>
          <div>
            <div className="font-serif-display text-base font-semibold leading-tight text-[#1C1B18]">
              Fault Lines UX Solutions Lab
            </div>
            <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#8A8478]">
              UX Case Study · Formative Study (n = 12)
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5" aria-label="Case study sections">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? 'bg-[#1C1B18] text-white shadow-sm'
                    : 'text-[#57534E] hover:bg-[#F3EFE7] hover:text-[#1C1B18]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

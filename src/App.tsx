import React, { useCallback, useEffect, useState } from 'react';
import { CaseStudyOverviewView } from './components/case-study/CaseStudyOverviewView';
import { ChatbotShowcaseView } from './components/case-study/ChatbotShowcaseView';
import { StudyResultsView } from './components/case-study/StudyResultsView';
import { TopNav } from './components/case-study/TopNav';
import { SolutionsLabView } from './components/solutions/SolutionsLabView';
import { FAULT_LINES } from './data/faultLines';
import { CaseStudyTab, FaultLineId } from './types/epistemia';

function parseHashLocation(): { tab: CaseStudyTab; faultLine: FaultLineId } {
  if (typeof window === 'undefined') {
    return { tab: 'case-study', faultLine: 'grounding' };
  }
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('lab')) {
    const [, maybeId] = hash.split('/');
    const valid = FAULT_LINES.find((f) => f.id === maybeId)?.id ?? 'grounding';
    return { tab: 'lab', faultLine: valid };
  }
  if (hash === 'chatbot') return { tab: 'chatbot', faultLine: 'grounding' };
  if (hash === 'results') return { tab: 'results', faultLine: 'grounding' };
  return { tab: 'case-study', faultLine: 'grounding' };
}

export const App: React.FC = () => {
  const initial = parseHashLocation();
  const [activeTab, setActiveTab] = useState<CaseStudyTab>(initial.tab);
  const [activeFaultLine, setActiveFaultLine] = useState<FaultLineId>(initial.faultLine);

  const syncHash = useCallback((tab: CaseStudyTab, faultLine: FaultLineId) => {
    const nextHash = tab === 'lab' ? `#lab/${faultLine}` : `#${tab}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHashLocation();
      setActiveTab(parsed.tab);
      setActiveFaultLine(parsed.faultLine);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSelectTab = (tab: CaseStudyTab) => {
    setActiveTab(tab);
    syncHash(tab, activeFaultLine);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLab = (id?: FaultLineId) => {
    const target = id ?? activeFaultLine;
    setActiveFaultLine(target);
    setActiveTab('lab');
    syncHash('lab', target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1B18]">
      <TopNav activeTab={activeTab} onSelectTab={handleSelectTab} />

      <main className="pb-16">
        {activeTab === 'case-study' && (
          <CaseStudyOverviewView
            onOpenLab={handleOpenLab}
            onOpenResults={() => handleSelectTab('results')}
          />
        )}

        {activeTab === 'lab' && (
          <SolutionsLabView
            activeFaultLine={activeFaultLine}
            onSelectFaultLine={(id) => handleOpenLab(id)}
          />
        )}

        {activeTab === 'chatbot' && (
          <ChatbotShowcaseView onOpenLab={(id) => handleOpenLab(id)} />
        )}

        {activeTab === 'results' && <StudyResultsView onOpenLab={(id) => handleOpenLab(id)} />}
      </main>
    </div>
  );
};

export default App;

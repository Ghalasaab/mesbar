import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import { TWIN_ROADMAPS, TWIN_TABS, TRACKS } from '../../data/careerData';
import styles from './CareerTwin.module.css';

export default function CareerTwin() {
  const { lang, t } = useLang();
  const [active, setActive] = useState('cyber');

  const roadmap = TWIN_ROADMAPS[active];

  if (!roadmap) return null;

  const isTech = roadmap.domain === 'tech';
  const name = lang === 'ar' ? roadmap.name_ar : roadmap.name_en;
  const salary = lang === 'ar' ? roadmap.salary_ar : roadmap.salary;
  const titles = lang === 'ar' ? roadmap.topTitles_ar : roadmap.topTitles_en;
  const coreSkills = lang === 'ar' ? roadmap.coreSkills_ar : roadmap.coreSkills_en;

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>{t('twin.eyebrow')}</span>
        <h1 className={styles.title}>{t('twin.title')}</h1>
        <p className={styles.sub}>{t('twin.sub')}</p>
      </div>

      {/* Track Tabs */}
      <div className={styles.tabsSection}>
        <div className={styles.tabGroup}>
          <div className={styles.tabGroupLabel}>{t('twin.techTracks')}</div>
          <div className={styles.tabs}>
            {TWIN_TABS.filter(t => t.domain === 'tech').map(tab => {
              const track = TRACKS[tab.key];
              const tName = lang === 'ar' ? track.ar : track.en;
              return (
                <button
                  key={tab.key}
                  className={`${styles.tab} ${active === tab.key ? styles.tabActiveTech : ''}`}
                  onClick={() => setActive(tab.key)}
                >
                  <span className={styles.tabIcon}>{track.icon}</span>
                  {tName}
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles.tabGroup}>
          <div className={styles.tabGroupLabel}>{t('twin.bizTracks')}</div>
          <div className={styles.tabs}>
            {TWIN_TABS.filter(t => t.domain === 'biz').map(tab => {
              const track = TRACKS[tab.key];
              const tName = lang === 'ar' ? track.ar : track.en;
              return (
                <button
                  key={tab.key}
                  className={`${styles.tab} ${active === tab.key ? styles.tabActiveBiz : ''}`}
                  onClick={() => setActive(tab.key)}
                >
                  <span className={styles.tabIcon}>{track.icon}</span>
                  {tName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Roadmap Content */}
      <div className={styles.content} key={active}>
        {/* Track Overview */}
        <div className={styles.overview}>
          <div className={`${styles.overviewBadge} ${isTech ? styles.overviewBadgeTech : styles.overviewBadgeBiz}`}>
            {isTech ? '⬡' : '◈'} {isTech ? t('domains.tech') : t('domains.biz')}
          </div>
          <h2 className={styles.overviewName}>{name}</h2>

          <div className={styles.overviewGrid}>
            {/* Salary */}
            <div className={styles.overviewCard}>
              <div className={styles.overviewCardLabel}>💰 {t('twin.salaryRange')}</div>
              <div className={`${styles.overviewCardVal} ${isTech ? styles.valTech : styles.valBiz}`}>
                {salary}
              </div>
            </div>

            {/* Job Titles */}
            <div className={styles.overviewCard}>
              <div className={styles.overviewCardLabel}>📋 {t('twin.jobTitles')}</div>
              <div className={styles.titlesList}>
                {titles.map((title, i) => (
                  <span key={i} className={`${styles.titlePill} ${isTech ? styles.titlePillTech : styles.titlePillBiz}`}>
                    {title}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Skills */}
            <div className={styles.overviewCard}>
              <div className={styles.overviewCardLabel}>⚡ {t('twin.commonSkills')}</div>
              <div className={styles.skillsList}>
                {coreSkills.map((skill, i) => (
                  <span key={i} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className={styles.timeline}>
          <h3 className={styles.timelineTitle}>{t('twin.milestones')}</h3>
          <div className={styles.milestones}>
            {roadmap.milestones.map((m, i) => {
              const mTitle = lang === 'ar' ? m.title_ar : m.title_en;
              const mRole = lang === 'ar' ? m.role_ar : m.role_en;
              const mSkills = lang === 'ar' ? m.skills_ar : m.skills_en;
              const isFirst = i === 0;
              const isLast = i === roadmap.milestones.length - 1;

              return (
                <div key={i} className={styles.milestone}>
                  {/* Timeline connector */}
                  <div className={styles.connector}>
                    <div className={`${styles.connNode} ${isTech ? styles.connNodeTech : styles.connNodeBiz} ${isFirst ? styles.connNodeFirst : ''}`}>
                      {isLast ? '★' : m.year}
                    </div>
                    {!isLast && <div className={`${styles.connLine} ${isTech ? styles.connLineTech : styles.connLineBiz}`} />}
                  </div>

                  {/* Content */}
                  <div className={`${styles.milestoneCard} ${isFirst ? (isTech ? styles.milestoneCardActiveTech : styles.milestoneCardActiveBiz) : ''}`}>
                    <div className={styles.milestoneTop}>
                      <div>
                        <div className={`${styles.milestoneYear} ${isTech ? styles.milestoneYearTech : styles.milestoneYearBiz}`}>
                          {t('twin.yearLabel')} {m.year}
                        </div>
                        <div className={styles.milestoneLabel}>{mTitle}</div>
                      </div>
                      {mRole && (
                        <div className={`${styles.roleChip} ${isTech ? styles.roleChipTech : styles.roleChipBiz}`}>
                          {mRole}
                        </div>
                      )}
                    </div>
                    <div className={styles.milestoneSkills}>
                      {mSkills.map((skill, si) => (
                        <span key={si} className={`${styles.mSkill} ${isTech ? styles.mSkillTech : styles.mSkillBiz}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data note */}
        <div className={styles.note}>
          ℹ️ {t('twin.note')}
        </div>
      </div>
    </div>
  );
}

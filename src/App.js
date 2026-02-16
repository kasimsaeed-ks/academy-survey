
import { useState } from "react";

const surveyData = {
  sections: [
    {
      id: "demographics",
      title: "About You & Your Child",
      icon: "👨‍👧",
      questions: [
        {
          id: "area",
          type: "radio",
          question: "Which area of Islamabad do you reside in?",
          options: [
            "PWD",
            "Gulberg Greens",
            "Soan Gardens",
            "Gulraiz",
            "Bahria Town",
            "Other",
          ],
        },
        {
          id: "childAge",
          type: "select",
          question: "What is your child's current age?",
          options: ["10 years", "11 years", "12 years", "13 years", "14 years", "15 years", "16 years"],
        },
        {
          id: "childClass",
          type: "select",
          question: "What class/grade is your child currently in?",
          options: ["Class 5", "Class 6", "Class 7", "Class 8", "Class 9 (O-Levels/IGCSE Year 1)", "Class 10 (O-Levels/IGCSE Year 2)"],
        },
        {
          id: "numChildren",
          type: "select",
          question: "How many school-going children (ages 10–16) do you have?",
          options: ["1", "2", "3", "4 or more"],
        },
      ],
    },
    {
      id: "currentHabits",
      title: "Current After-School Habits",
      icon: "📚",
      questions: [
        {
          id: "currentTuition",
          type: "radio",
          question: "Is your child currently attending any tuition center or coaching class?",
          options: ["Yes", "No"],
        },
        {
          id: "tuitionSpend",
          type: "select",
          question: "How much are you currently spending per month on tuition/coaching? (PKR)",
          options: ["Less than 5,000", "5,000 – 10,000", "10,000 – 20,000", "20,000 – 35,000", "More than 35,000", "Not currently paying (N/A)"],
        },
        {
          id: "afterSchoolTime",
          type: "radio",
          question: "What does your child mostly do between 4 PM – 8 PM on weekdays?",
          options: ["Tuition / Coaching", "Homework at home", "Screen time (YouTube, games, social media)", "Sports / Physical activity", "Religious classes (Madaris / Quran)", "Mix of the above"],
        },
      ],
    },
    {
      id: "painPoints",
      title: "Pain Points & Frustrations",
      icon: "💭",
      questions: [
        {
          id: "frustrations",
          type: "checkbox",
          question: "What frustrates you most about existing tuition centers? (Select all that apply)",
          options: [
            "They only focus on homework — no real learning",
            "No character or values development",
            "My child gets bored and loses motivation",
            "No practical/real-world skill building",
            "Poor quality of teachers",
            "Too focused on rote memorization",
            "No extracurricular or recreational activities",
            "Lack of Islamic values integration",
          ],
        },
        {
          id: "worries",
          type: "checkbox",
          question: "What are your biggest concerns about your child's development right now? (Select all that apply)",
          options: [
            "Academic performance / exam results",
            "Lack of critical thinking skills",
            "Too much screen time / social media influence",
            "No entrepreneurial or business mindset",
            "Disconnect from Islamic identity & values",
            "Lack of communication / debate skills",
            "Physical fitness & health",
            "No exposure to technology & innovation",
          ],
        },
      ],
    },
    {
      id: "interest",
      title: "Interest & Willingness",
      icon: "🎯",
      questions: [
        {
          id: "programInterest",
          type: "checkbox",
          question: "Which of the following programs would interest you for your child? (Select all that apply)",
          options: [
            "Homework & daily tuition support",
            "IGCSE / O-Level exam preparation & crash courses",
            "Literacy & Numeracy skill classes",
            "STEAM classes (coding, modelling, experiments)",
            "Islamic History & Values (character-building)",
            "Current Affairs & Debate Society",
            "Entrepreneurship & E-Commerce basics",
            "Sports (Football, Table Tennis)",
            "Educational games & recreational activities",
          ],
        },
        {
          id: "willingness",
          type: "select",
          question: "How much would you be willing to pay per month for a comprehensive program like this? (PKR)",
          options: [
            "Up to 8,000",
            "8,000 – 15,000",
            "15,000 – 25,000",
            "25,000 – 40,000",
            "Above 40,000 (if quality is excellent)",
            "Not sure yet",
          ],
        },
        {
          id: "decisionFactor",
          type: "radio",
          question: "What would be the BIGGEST factor in your decision to enroll your child?",
          options: [
            "Quality & reputation of teachers",
            "Holistic development (not just academics)",
            "Islamic values & character building",
            "Practical life skills & entrepreneurship",
            "Location & safety",
            "Price / affordability",
            "Word-of-mouth from other parents",
          ],
        },
      ],
    },
    {
      id: "preferences",
      title: "Preferences & Logistics",
      icon: "⚙️",
      questions: [
        {
          id: "timing",
          type: "radio",
          question: "Which time slot works best for your child? (After school)",
          options: ["4:00 PM – 6:00 PM", "5:00 PM – 7:00 PM", "6:00 PM – 8:00 PM", "Flexible (any of the above)"],
        },
        {
          id: "location",
          type: "radio",
          question: "How far would you be willing to travel for a quality institute?",
          options: ["Within 5 minutes (walking distance)", "Up to 10–15 minutes by car", "Up to 20–30 minutes by car", "Distance doesn't matter if quality is right"],
        },
        {
          id: "communication",
          type: "radio",
          question: "How would you prefer to receive updates about your child's progress?",
          options: ["WhatsApp group / individual messages", "Dedicated mobile app", "Weekly written report", "Monthly parent-teacher meetings", "Mix of the above"],
        },
        {
          id: "feedback",
          type: "textarea",
          question: "Any additional thoughts, suggestions, or features you'd love to see? (Optional)",
        },
      ],
    },
  ],
};

export default function Survey() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(true);

  const section = surveyData.sections[currentSection];
  const totalSections = surveyData.sections.length;
  const progress = ((currentSection) / totalSections) * 100;

  const handleAnswer = (questionId, value, type) => {
    if (type === "checkbox") {
      const current = answers[questionId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [questionId]: updated });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const goNext = () => {
    setAnimatingIn(false);
    setTimeout(() => {
      setCurrentSection((prev) => prev + 1);
      setAnimatingIn(true);
    }, 300);
  };

  const goBack = () => {
    setAnimatingIn(false);
    setTimeout(() => {
      setCurrentSection((prev) => prev - 1);
      setAnimatingIn(true);
    }, 300);
  };

  const handleSubmit = () => {
    setAnimatingIn(false);
    setTimeout(() => {
      setSubmitted(true);
      setAnimatingIn(true);
    }, 300);
  };

  if (submitted) {
    return (
      <div style={styles.wrapper}>
        <div style={{ ...styles.container, ...styles.thankYouContainer, opacity: animatingIn ? 1 : 0, transform: animatingIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
          <div style={styles.thankYouIcon}>✅</div>
          <h2 style={styles.thankYouTitle}>Jazak Allah Khair!</h2>
          <p style={styles.thankYouText}>
            Your feedback is incredibly valuable. It will directly help shape a better educational experience for students in Islamabad.
          </p>
          <div style={styles.thankYouDivider}></div>
          <p style={styles.thankYouSubText}>We'll be in touch soon with updates on our launch.</p>
          <button style={styles.restartBtn} onClick={() => { setSubmitted(false); setCurrentSection(0); setAnswers({}); setAnimatingIn(true); }}>
            Take Survey Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerBrand}>
          <span style={styles.brandIcon}>🎓</span>
          <div>
            <div style={styles.brandName}>Holistic Learning Institute</div>
            <div style={styles.brandSub}>Parent Feedback Survey — Islamabad</div>
          </div>
        </div>
        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressLabels}>
            <span style={styles.progressLabel}>Section {currentSection + 1} of {totalSections}</span>
            <span style={styles.progressLabel}>{Math.round(progress)}% complete</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
          </div>
          {/* Section Dots */}
          <div style={styles.dotsContainer}>
            {surveyData.sections.map((s, i) => (
              <div key={i} style={{ ...styles.dot, ...(i <= currentSection ? styles.dotActive : {}), ...(i === currentSection ? styles.dotCurrent : {}) }} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ ...styles.container, opacity: animatingIn ? 1 : 0, transform: animatingIn ? "translateY(0)" : "translateY(15px)", transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
        {/* Section Title */}
        <div style={styles.sectionHeader}>
          <span style={styles.sectionIcon}>{section.icon}</span>
          <div>
            <h2 style={styles.sectionTitle}>{section.title}</h2>
            <p style={styles.sectionSubtitle}>
              {currentSection === 0 && "Let's start with some basic details about you and your child."}
              {currentSection === 1 && "Help us understand what your child is currently doing after school."}
              {currentSection === 2 && "Be honest — your frustrations help us build something better."}
              {currentSection === 3 && "Tell us what excites you and what you'd be open to."}
              {currentSection === 4 && "Finally, let's talk about what works best for your family."}
            </p>
          </div>
        </div>

        {/* Questions */}
        {section.questions.map((q, qi) => (
          <div key={q.id} style={{ ...styles.questionBlock, animationDelay: `${qi * 0.08}s` }}>
            <label style={styles.questionLabel}>
              <span style={styles.questionNumber}>{qi + 1}</span>
              {q.question}
            </label>

            {q.id === "area" && answers[q.id] === "Other" && (
              <input
                type="text"
                placeholder="Please specify your area..."
                value={answers["area_other"] || ""}
                onChange={(e) => handleAnswer("area_other", e.target.value, "text")}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "rgba(99, 102, 241, 0.08)",
                  border: "1px solid rgba(99, 102, 241, 0.35)",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                  fontSize: "13px",
                  outline: "none",
                  marginTop: "8px",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
              />
            )}

            {q.type === "select" && (
              <select
                style={styles.select}
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswer(q.id, e.target.value, "select")}
              >
                <option value="" disabled>Select an option...</option>
                {q.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {q.type === "radio" && (
              <div style={styles.optionsGrid}>
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    style={{
                      ...styles.optionCard,
                      ...(answers[q.id] === opt ? styles.optionCardActive : {}),
                    }}
                    onClick={() => handleAnswer(q.id, opt, "radio")}
                  >
                    <div style={{ ...styles.radioCircle, ...(answers[q.id] === opt ? styles.radioCircleActive : {}) }}>
                      {answers[q.id] === opt && <div style={styles.radioInner}></div>}
                    </div>
                    <span style={styles.optionText}>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === "checkbox" && (
              <div style={styles.optionsGrid}>
                {q.options.map((opt) => {
                  const isChecked = (answers[q.id] || []).includes(opt);
                  return (
                    <label
                      key={opt}
                      style={{
                        ...styles.optionCard,
                        ...(isChecked ? styles.optionCardActive : {}),
                      }}
                      onClick={() => handleAnswer(q.id, opt, "checkbox")}
                    >
                      <div style={{ ...styles.checkBox, ...(isChecked ? styles.checkBoxActive : {}) }}>
                        {isChecked && <span style={styles.checkMark}>✓</span>}
                      </div>
                      <span style={styles.optionText}>{opt}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {q.type === "textarea" && (
              <textarea
                style={styles.textarea}
                placeholder="Share your thoughts here..."
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswer(q.id, e.target.value, "textarea")}
                rows={4}
              />
            )}
          </div>
        ))}

        {/* Navigation */}
        <div style={styles.navButtons}>
          {currentSection > 0 && (
            <button style={styles.backBtn} onClick={goBack}>
              ← Back
            </button>
          )}
          <div style={styles.navRight}>
            {currentSection < totalSections - 1 ? (
              <button style={styles.nextBtn} onClick={goNext}>
                Continue → 
              </button>
            ) : (
              <button style={styles.submitBtn} onClick={handleSubmit}>
                Submit Survey ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
    fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
    color: "#e2e8f0",
    padding: "0",
  },
  header: {
    background: "linear-gradient(135deg, #1a2332 0%, #0f172a 100%)",
    borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
    padding: "20px 24px 16px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  headerBrand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },
  brandIcon: {
    fontSize: "28px",
  },
  brandName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#f1f5f9",
    letterSpacing: "-0.3px",
  },
  brandSub: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "1px",
  },
  progressContainer: {
    maxWidth: "560px",
  },
  progressLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  progressLabel: {
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  progressBar: {
    height: "4px",
    background: "#1e293b",
    borderRadius: "2px",
    overflow: "hidden",
    border: "1px solid rgba(99,102,241,0.15)",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    borderRadius: "2px",
    transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  dotsContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#334155",
    transition: "all 0.3s ease",
  },
  dotActive: {
    background: "#6366f1",
  },
  dotCurrent: {
    background: "#8b5cf6",
    boxShadow: "0 0 6px rgba(139, 92, 246, 0.5)",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "28px 20px 40px",
  },
  thankYouContainer: {
    textAlign: "center",
    paddingTop: "60px",
  },
  thankYouIcon: {
    fontSize: "56px",
    marginBottom: "20px",
  },
  thankYouTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "12px",
  },
  thankYouText: {
    fontSize: "15px",
    color: "#94a3b8",
    lineHeight: "1.6",
    maxWidth: "420px",
    margin: "0 auto",
  },
  thankYouDivider: {
    width: "50px",
    height: "2px",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    margin: "24px auto",
    borderRadius: "1px",
  },
  thankYouSubText: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "32px",
  },
  restartBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    marginBottom: "28px",
    padding: "20px",
    background: "rgba(99, 102, 241, 0.06)",
    borderRadius: "14px",
    border: "1px solid rgba(99, 102, 241, 0.12)",
  },
  sectionIcon: {
    fontSize: "28px",
    flexShrink: 0,
    marginTop: "2px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#f1f5f9",
    margin: "0 0 4px",
    letterSpacing: "-0.3px",
  },
  sectionSubtitle: {
    fontSize: "13px",
    color: "#64748b",
    margin: 0,
    lineHeight: "1.5",
  },
  questionBlock: {
    marginBottom: "24px",
  },
  questionLabel: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#e2e8f0",
    marginBottom: "10px",
    lineHeight: "1.5",
  },
  questionNumber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22px",
    height: "22px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "700",
    color: "#fff",
    marginRight: "8px",
    flexShrink: 0,
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "10px",
    color: "#e2e8f0",
    fontSize: "14px",
    appearance: "auto",
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  optionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  optionCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    userSelect: "none",
  },
  optionCardActive: {
    background: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.45)",
  },
  radioCircle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #475569",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s",
  },
  radioCircleActive: {
    border: "2px solid #6366f1",
  },
  radioInner: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#6366f1",
  },
  checkBox: {
    width: "20px",
    height: "20px",
    borderRadius: "5px",
    border: "2px solid #475569",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s",
  },
  checkBoxActive: {
    background: "#6366f1",
    border: "2px solid #6366f1",
  },
  checkMark: {
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
  },
  optionText: {
    fontSize: "13px",
    color: "#cbd5e1",
    lineHeight: "1.4",
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "10px",
    color: "#e2e8f0",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    minHeight: "100px",
  },
  navButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #1e293b",
  },
  navRight: {
    marginLeft: "auto",
  },
  backBtn: {
    background: "transparent",
    border: "1px solid #334155",
    color: "#94a3b8",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  nextBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)",
    transition: "all 0.2s",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    border: "none",
    padding: "13px 32px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 18px rgba(16, 185, 129, 0.4)",
    letterSpacing: "0.3px",
  },
};

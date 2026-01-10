import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import FireParticles from "@components/Others/FireParticles";
import { faqData, type FAQTextSegment } from "./faqData";

import faqBackground from "@img/parallax/tabern.png";
import adventurerSprite from "@img/speakers/Samuel-x64.png";
import lumiSprite from "@img/speakers/Midu-x64.png";
import "./FAQSection.scss";

type DialogueState = "initial" | "questioning" | "thinking" | "answering";

const getPlainTextFromSegments = (segments: FAQTextSegment[]) =>
  segments.map((segment) => segment.text).join("");

const renderTypedSegments = (
  segments: FAQTextSegment[],
  typedChars: number,
) => {
  const nodes: React.ReactNode[] = [];
  let remaining = typedChars;

  segments.forEach((segment, index) => {
    if (remaining <= 0) return;

    const visibleText = segment.text.slice(0, remaining);
    remaining -= visibleText.length;

    if (!visibleText) return;

    const contentNode = segment.em ? <em>{visibleText}</em> : visibleText;

    nodes.push(
      segment.href ? (
        <a
          key={index}
          href={segment.href}
          target={segment.external ? "_blank" : undefined}
          rel={segment.external ? "noreferrer noopener" : undefined}
        >
          {contentNode}
        </a>
      ) : (
        <React.Fragment key={index}>{contentNode}</React.Fragment>
      ),
    );
  });

  return nodes;
};

const FAQSection = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [dialogueState, setDialogueState] = useState<DialogueState>("initial");
  const [adventurerText, setAdventurerText] = useState<string>("");
  const [lumiText, setLumiText] = useState<string>(
    "¿Cómo puedo ayudarte, aventurero perdido?",
  );
  const [typedText, setTypedText] = useState<string>("");
  const [typedChars, setTypedChars] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typewriterTweenRef = useRef<gsap.core.Tween | null>(null);
  const lastTypedIndexRef = useRef<number>(0);
  const stageTimersRef = useRef<{
    thinking: ReturnType<typeof setTimeout> | null;
    answering: ReturnType<typeof setTimeout> | null;
  }>({ thinking: null, answering: null });

  const clearStageTimers = () => {
    if (stageTimersRef.current.thinking) {
      clearTimeout(stageTimersRef.current.thinking);
      stageTimersRef.current.thinking = null;
    }

    if (stageTimersRef.current.answering) {
      clearTimeout(stageTimersRef.current.answering);
      stageTimersRef.current.answering = null;
    }
  };

  const stopTypewriter = () => {
    typewriterTweenRef.current?.kill();
    typewriterTweenRef.current = null;
    lastTypedIndexRef.current = 0;
    setTypedChars(0);
    setIsTyping(false);
  };

  const getTypewriterDurationMs = (fullText: string) => {
    if (!fullText) return 0;
    const durationSec = Math.min(2.2, Math.max(0.6, fullText.length * 0.035));
    return Math.round(durationSec * 1000);
  };

  const startTypewriter = (fullText: string) => {
    stopTypewriter();

    if (!fullText) {
      setTypedText("");
      setTypedChars(0);
      return;
    }

    const durationSec = Math.min(2.2, Math.max(0.6, fullText.length * 0.035));
    const state = { i: 0 };

    lastTypedIndexRef.current = 0;
    setTypedText("");
    setTypedChars(0);
    setIsTyping(true);

    typewriterTweenRef.current = gsap.to(state, {
      i: fullText.length,
      duration: durationSec,
      ease: "none",
      onUpdate: () => {
        const nextIndex = Math.floor(state.i);
        if (nextIndex === lastTypedIndexRef.current) return;
        lastTypedIndexRef.current = nextIndex;
        setTypedText(fullText.slice(0, nextIndex));
        setTypedChars(nextIndex);
      },
      onComplete: () => {
        setTypedText(fullText);
        setTypedChars(fullText.length);
        setIsTyping(false);
      },
    });
  };

  useEffect(() => {
    // Reset to initial state after a longer period of inactivity
    if (dialogueState === "answering") {
      resetTimerRef.current = setTimeout(() => {
        resetDialogue();
      }, 60000);
    }

    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, [dialogueState]);

  useEffect(() => {
    return () => {
      clearStageTimers();
      stopTypewriter();
    };
  }, []);

  const resetDialogue = () => {
    clearStageTimers();
    stopTypewriter();
    setTypedText("");
    setTypedChars(0);
    setDialogueState("initial");
    setActiveQuestion(null);
    setAdventurerText("");
    setLumiText("¿Cómo puedo ayudarte, aventurero perdido?");
  };

  const handleQuestionClick = (id: number) => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    clearStageTimers();

    stopTypewriter();
    setTypedText("");
    setTypedChars(0);

    const faqItem = faqData.find((item) => item.id === id);
    if (!faqItem) return;

    setActiveQuestion(id);

    // Step 1: Show adventurer's question
    setDialogueState("questioning");
    setAdventurerText(faqItem.question);
    startTypewriter(faqItem.question);

    const questionTypeMs = getTypewriterDurationMs(faqItem.question);
    const pauseAfterQuestionMs = 700;
    const thinkingMs = 900;

    // Step 2: Lumi thinks (after question finishes typing + a small pause)
    stageTimersRef.current.thinking = setTimeout(() => {
      setDialogueState("thinking");
      setLumiText("...");
    }, questionTypeMs + pauseAfterQuestionMs);

    // Step 3: Lumi answers (after thinking pause)
    stageTimersRef.current.answering = setTimeout(
      () => {
        setDialogueState("answering");
        const plainAnswer = getPlainTextFromSegments(faqItem.answer);
        setLumiText(plainAnswer);
        startTypewriter(plainAnswer);
      },
      questionTypeMs + pauseAfterQuestionMs + thinkingMs,
    );
  };

  return (
    <section className="panel faq-section" id="faq">
      <div className="faq-parallax" aria-hidden="true">
        <img
          src={faqBackground.src}
          alt="Taberna medieval"
          className="faq-parallax-img faq-backdrop-img"
        />
        <div className="faq-gradient" />
        <div className="faq-particles">
          <FireParticles count={60} />
        </div>
      </div>

      <div className="faq-container">
        <div className="faq-content">
          {/* Questions List */}
          <div className="faq-questions">
            <h3 className="faq-questions-title">Preguntas frecuentes</h3>
            <ul className="faq-questions-list" role="list">
              {faqData.map((item) => (
                <li key={item.id}>
                  <button
                    className={`faq-question-button ${
                      activeQuestion === item.id ? "active" : ""
                    }`}
                    onClick={() => handleQuestionClick(item.id)}
                    aria-current={activeQuestion === item.id ? "true" : "false"}
                  >
                    {item.question}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Dialogue Scene */}
          <div className="faq-dialogue">
            <div className="faq-dialogue-scene">
              {/* Characters sprites */}
              <div className="faq-characters-display">
                <div className="faq-character-sprite adventurer">
                  <img
                    src={adventurerSprite.src}
                    alt="Aventurero"
                    className={`faq-sprite-image ${
                      dialogueState === "questioning" ? "speaking" : ""
                    }`}
                  />
                </div>
                <div className="faq-character-sprite lumi">
                  <img
                    src={lumiSprite.src}
                    alt="Lumi"
                    className={`faq-sprite-image ${
                      dialogueState === "initial" ||
                      dialogueState === "thinking" ||
                      dialogueState === "answering"
                        ? "speaking"
                        : ""
                    }`}
                  />
                </div>
              </div>

              {/* Dialogue box at bottom */}
              <div className="faq-dialogue-box">
                <div
                  className={`faq-dialogue-header ${
                    dialogueState === "questioning" ? "left" : "right"
                  }`}
                >
                  <div className="faq-dialogue-name">
                    {dialogueState === "questioning"
                      ? "Aventurero Perdido"
                      : "Lumi"}
                  </div>
                </div>
                <div className="faq-dialogue-content">
                  <div className="faq-dialogue-text">
                    {dialogueState === "thinking" ? (
                      <span className="faq-thinking-dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    ) : dialogueState === "questioning" ? (
                      <>
                        {typedText}
                        {isTyping ? (
                          <span className="faq-caret" aria-hidden="true">
                            ▍
                          </span>
                        ) : null}
                      </>
                    ) : dialogueState === "answering" ? (
                      <>
                        {renderTypedSegments(
                          faqData.find((item) => item.id === activeQuestion)
                            ?.answer ?? [{ text: typedText }],
                          typedChars,
                        )}
                        {isTyping ? (
                          <span className="faq-caret" aria-hidden="true">
                            ▍
                          </span>
                        ) : null}
                      </>
                    ) : (
                      lumiText
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

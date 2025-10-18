import React, { useState, useRef } from "react";
import gsap from "gsap";
import Match from "./Match";
import "./RaffleForm.scss";

interface FormData {
  name: string;
  email: string;
  acceptTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  acceptTerms?: string;
}

interface RaffleFormProps {
  description?: string;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
  onAnimationStart?: () => void;
  onSuccess?: () => void;
}

const RaffleForm: React.FC<RaffleFormProps> = ({
  description,
  onSubmit,
  isLoading = false,
  onAnimationStart,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string>("");

  const [isAnimating, setIsAnimating] = useState(false);
  const [matchLit, setMatchLit] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const matchRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const playMatchAnimation = async () => {
    if (!matchRef.current || !buttonRef.current || !formRef.current) {
      return;
    }

    const tl = gsap.timeline();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const matchRect = matchRef.current.getBoundingClientRect();

    const deltaY = buttonRect.top - matchRect.top + 10;
    const deltaX =
      buttonRect.left +
      buttonRect.width / 2 -
      (matchRect.left + matchRect.width / 2);

    if (successRef.current) {
      gsap.set(successRef.current, {
        opacity: 0,
        y: 20,
        display: "none",
      });
    }

    tl.to(matchRef.current, {
      y: deltaY,
      x: deltaX,
      rotation: -20,
      duration: 1.2,
      ease: "power2.inOut",
    })
      .add(() => {
        setMatchLit(true);
      }, "-=0.2")
      .to({}, { duration: 0.5 })
      .to(matchRef.current, {
        x: 0,
        y: -60,
        rotation: 0,
        // scale eliminado para mantener tamaño original de la cerilla
        duration: 1.0,
        ease: "back.out(1.7)",
      })
      .to(
        formRef.current,
        {
          opacity: 0,
          duration: 0.6,
        },
        "-=0.8",
      );

    if (successRef.current) {
      tl.to(
        successRef.current,
        {
          display: "block",
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(matchRef.current, {
              x: 0,
              y: 0,
              rotation: 0,
              visibility: "visible",
              opacity: 1,
              zIndex: 100,
            });
          },
        },
        "-=0.4",
      );
    }

    return tl;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no tiene un formato válido";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isAnimating) {
      return;
    }

    setSubmitStatus("submitting");
    setSubmitError("");
    setIsAnimating(true);

    if (onAnimationStart) {
      onAnimationStart();
    }

    try {
      const animationPromise = playMatchAnimation();
      await onSubmit(formData);
      await animationPromise;
      setSubmitStatus("success");
      onSuccess?.();
      setFormData({
        name: "",
        email: "",
        acceptTerms: false,
      });
    } catch (error) {
      setSubmitStatus("error");
      setIsAnimating(false);
      setMatchLit(false);

      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError(
          "Hubo un error al registrarte. Por favor, inténtalo de nuevo.",
        );
      }
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="raffle-form">
      <div ref={successRef} className="raffle-form__success-animation">
        <div className="raffle-form__success">
          <h3>¡Tu cerilla se ha encendido!</h3>
          <p>Te has registrado correctamente en el sorteo.</p>
          <p>Te mandaremos un correo si ganas.</p>
        </div>
      </div>

      <div ref={matchRef} className="raffle-form__match-static">
        <Match isLit={matchLit} headColor="#ea3368" />
      </div>

      {submitStatus !== "success" && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="raffle-form__form"
        >
          {description && (
            <div className="raffle-form__description">{description}</div>
          )}
          <input
            className={`raffle-form__input ${
              errors.name ? "raffle-form__input--error" : ""
            }`}
            placeholder="Nombre"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={isLoading}
          />
          {errors.name && (
            <span className="raffle-form__error">{errors.name}</span>
          )}

          <input
            className={`raffle-form__input ${
              errors.email ? "raffle-form__input--error" : ""
            }`}
            placeholder="Correo electrónico"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={isLoading}
          />
          {errors.email && (
            <span className="raffle-form__error">{errors.email}</span>
          )}

          <div className="raffle-form__checkbox-row">
            <label className="raffle-form__checkbox-label">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  handleInputChange("acceptTerms", e.target.checked)
                }
                disabled={isLoading}
              />
              <span className="raffle-form__checkbox-custom"></span>
              Acepto los términos y condiciones
            </label>
          </div>
          {errors.acceptTerms && (
            <span className="raffle-form__error">{errors.acceptTerms}</span>
          )}

          {submitStatus === "error" && (
            <div className="raffle-form__error-message">
              {submitError ||
                "Hubo un error al registrarte. Por favor, inténtalo de nuevo."}
            </div>
          )}

          <div className="raffle-form__panel-footer">
            <button
              ref={buttonRef}
              type="submit"
              className={`raffle-form__submit ${
                isAnimating ? "raffle-form__submit--animating" : ""
              }`}
              disabled={isLoading || isAnimating}
            >
              {isLoading || isAnimating ? <>ENVIANDO...</> : <>PARTICIPA</>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RaffleForm;

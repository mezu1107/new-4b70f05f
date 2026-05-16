import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, RotateCcw } from "lucide-react";

const questions = [
  {
    q: "What's your primary business goal right now?",
    options: ["Generate more leads", "Increase online sales", "Build brand awareness", "Launch a product / app"],
  },
  {
    q: "What's your monthly marketing budget?",
    options: ["Under PKR 50k", "PKR 50k – 200k", "PKR 200k – 500k", "PKR 500k+"],
  },
  {
    q: "Which channel matters most to you?",
    options: ["Google / SEO", "Social Media", "Paid Ads", "Website / App"],
  },
  {
    q: "How fast do you need results?",
    options: ["ASAP (1 month)", "1–3 months", "3–6 months", "Long-term growth"],
  },
];

const recommendations: Record<string, { title: string; service: string }> = {
  "Generate more leads": { title: "Lead Generation Engine", service: "SEO + Google Ads + Landing Pages" },
  "Increase online sales": { title: "E-Commerce Growth System", service: "Shopify + Meta Ads + Email" },
  "Build brand awareness": { title: "Brand Authority Package", service: "Social Media + Content + Branding" },
  "Launch a product / app": { title: "Product Launch Suite", service: "App / Web Dev + Marketing Launch" },
};

export const InteractiveQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= questions.length;
  const rec = answers[0] ? recommendations[answers[0]] : null;

  const choose = (opt: string) => {
    setAnswers([...answers, opt]);
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <Card className="p-8 md:p-10 shadow-elegant border-2 border-primary/10 bg-gradient-to-br from-white to-secondary">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-accent" />
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Smart Growth Quiz</span>
      </div>

      {!done && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(((step) / questions.length) * 100)}% done</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(step / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl mb-6">{questions[step].q}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {questions[step].options.map((opt) => (
                <motion.button
                  key={opt}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => choose(opt)}
                  className="text-left p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-smooth font-medium"
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 rounded-full gradient-primary mx-auto mb-5 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl mb-3">Your Recommended Solution</h3>
            <div className="text-3xl font-extrabold text-gradient mb-2">{rec?.title}</div>
            <p className="text-muted-foreground mb-6">{rec?.service}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="hero" size="lg" asChild>
                <a href="/contact">Get My Custom Plan</a>
              </Button>
              <Button variant="outline" size="lg" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" /> Restart
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

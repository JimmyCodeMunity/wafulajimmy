import { motion } from "framer-motion";
import { Section, SectionHeader } from "./ui/section";
import { Badge } from "./ui/badge";
import { usePortfolio, type Skill } from "../context/PortfolioContext";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const skills = [
  { name: "HTML", level: 95, category: "Frontend" },
  { name: "CSS", level: 92, category: "Frontend" },
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 88, category: "Frontend" },
  { name: "React", level: 93, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "React Native", level: 82, category: "Mobile" },
  { name: "Node.js", level: 87, category: "Backend" },
  { name: "PHP", level: 80, category: "Backend" },
  { name: "Laravel", level: 78, category: "Backend" },
  { name: "Python", level: 85, category: "Backend" },
  { name: "Django", level: 82, category: "Backend" },
  { name: "MongoDB", level: 84, category: "Database" },
  { name: "SQL", level: 88, category: "Database" },
];

const categories = ["Frontend", "Backend", "Mobile", "Database"];

export function About() {
  const { loading, portfolio } = usePortfolio();
  return (
    <Section
      id="about"
      className="bg-gradient-to-b from-background to-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="About Me"
          subtitle={`${portfolio?.details?.aboutheading || ""} `}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                My Journey
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{portfolio?.details?.journey || ""}</p>
                <p>
                  I specialize in modern web technologies and have a passion for
                  creating intuitive user experiences backed by robust, scalable
                  architectures.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open source projects, or
                  mentoring fellow developers.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Technical Skills
              </h3>

              {portfolio?.categories
                ?.slice(0, 3)
                ?.map((category, categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                    className="mb-6 last:mb-0"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {category?.name}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {category?.skills?.map(
                        (skill: Skill, skillIndex: number) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            }}
                            className="group"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">
                                {skill.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {skill.percentage}%
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.percentage}%` }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1.2,
                                  delay: categoryIndex * 0.2 + skillIndex * 0.1,
                                  ease: "easeOut",
                                }}
                                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full relative"
                              >
                                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                              </motion.div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>
                ))}
              {/* cick button to show a dialog */}
              <Dialog
              // size
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="group w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 glow-soft"
                  >
                    View More
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[800px]">
                  <div className="h-full overflow-y-auto w-full">
                    <div className="glass rounded-2xl p-8">
                      <h3 className="text-2xl font-semibold mb-6 text-primary">
                        Technical Skills
                      </h3>

                      {portfolio?.categories.map((category, categoryIndex) => (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: categoryIndex * 0.1,
                          }}
                          className="mb-6 last:mb-0"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              variant="secondary"
                              className="text-xs font-medium"
                            >
                              {category?.name}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {category?.skills?.map(
                              (skill: Skill, skillIndex: number) => (
                                <motion.div
                                  key={skill.name}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.3,
                                    delay:
                                      categoryIndex * 0.1 + skillIndex * 0.05,
                                  }}
                                  className="group"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">
                                      {skill.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {skill.percentage}%
                                    </span>
                                  </div>
                                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileInView={{
                                        width: `${skill.percentage}%`,
                                      }}
                                      viewport={{ once: true }}
                                      transition={{
                                        duration: 1.2,
                                        delay:
                                          categoryIndex * 0.2 +
                                          skillIndex * 0.1,
                                        ease: "easeOut",
                                      }}
                                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full relative"
                                    >
                                      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                                    </motion.div>
                                  </div>
                                </motion.div>
                              )
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose>Close</DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

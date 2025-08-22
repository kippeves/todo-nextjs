import React, { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeFormat from "rehype-format";
import { Textarea } from "../../ui/textarea";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { Card, CardContent } from "@/components/ui/card";
import styles from "./mdx-parser.module.css";
import { Button } from "@/components/ui/button";

function MdxParser() {
  const [raw, setRaw] = useState<string>();
  const [html, setHTML] = useState<{ __html: string }>();
  const [flipped, setFlipped] = useState<boolean>(false);
  useEffect(() => {
    async function parseData(value: string) {
      return await unified()
        .use(remarkParse) // Convert into markdown AST
        .use(remarkRehype) // Transform to HTML AST
        .use(remarkGfm)
        .use(rehypeFormat)
        .use(rehypeSanitize) // Sanitize HTML input
        .use(rehypeStringify) // Convert AST into serialized HTML
        .process(value);
    }

    parseData(raw ?? "").then((e) => {
      setHTML({ __html: e.toString() });
    });
  }, [raw]);

  const flipCard = () => setFlipped((e) => !e);

  return (
    <div className={`flex flex-col gap-4 grow prose prose-invert h-2/3`}>
      <Card className={`h-full `}>
        <CardContent className="h-full">
          {flipped && (
            <Textarea
              id="md"
              className="h-full resize-none"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
            />
          )}
          {!flipped && html && <div dangerouslySetInnerHTML={html} />}
        </CardContent>
      </Card>
      <Button type="button" onClick={() => flipCard()}>
        Preview
      </Button>
    </div>
  );
}

export default MdxParser;

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/molecules/shadcn/accordion"
import TopicsTable from "../../../components/organisms/TopicsTable"


const Performance = () => {

  return (
      <div className=' mx-8'>
          <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                  <AccordionTrigger>Topics</AccordionTrigger>
                  <AccordionContent>
                    <TopicsTable />
                  </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                  <AccordionTrigger>Languages</AccordionTrigger>
                    <AccordionContent>
                    
                    </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                  <AccordionTrigger>Frameworks</AccordionTrigger>
                    <AccordionContent>
                    
                    </AccordionContent>
              </AccordionItem>
          </Accordion>
      </div>
  )
}

export default Performance
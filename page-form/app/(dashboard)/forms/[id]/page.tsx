import { GetFormById, GetFormWithSubmissions } from '@/actions/form'
import FormBuilder from '@/components/FormBuilder';
import React, { ReactNode } from 'react'
import VisitBtn from '@/components/VisitBtn';
import FormLinkShare from '@/components/FormLinkShare';
import { StatsCard } from '../../page';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { number } from 'zod';
import { ElementsType, FormElementInstance } from '@/components/FormElement';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
async function FormDetailPage({ params }: {
  params: {
    id: String
  }
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error("form not found");
  }

  const { visits, submissions } = form;
  let submissionsRate = 0;
  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionsRate;

  return (
    <>
      <div className='py-10 border-t border-b border-muted'>
        <div className='flex justify-between container'>
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
          <div className='container flex gap-2 items-center justify-between'>
            <FormLinkShare shareUrl={form.shareURL} />
          </div>
        </div>
      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container'>
        <StatsCard
          title="Total visits"
          loading={false}
          icon={<LuView className="text-blue-600" />}
          helperText="All time form visits"
          Value={visits.toLocaleString() || ""}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Total submissions"
          loading={false}
          icon={<FaWpforms className="text-yellow-600" />}
          helperText="All time form submissions"
          Value={submissions.toLocaleString() || ""}
          className="shadow-md shadow-yellow-600"
        />
        <StatsCard
          title="Submission rate"
          loading={false}
          icon={<HiCursorClick className="text-green-600" />}
          helperText="Visits that result in form submission"
          Value={submissionsRate.toLocaleString() + "%" || ""}
          className="shadow-md shadow-green-600"
        />
        <StatsCard
          title="Bounce rate"
          loading={false}
          icon={<TbArrowBounce className="text-red-600" />}
          helperText="Visits that leaves  without interacting"
          Value={bounceRate.toLocaleString() + "%" || ""}
          className="shadow-md shadow-red-600"
        />
      </div> 
      <div className='pt-10 container'>
        <SubmissionsTable id={form.id}/>
      </div>
    </>
  );
}

export default FormDetailPage;

type Row = {[key:string]:string} & {
  submittedAt: Date;
};

async function  SubmissionsTable({id}:{id: number}){
  const form = await GetFormWithSubmissions(id);
  if(!form){
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns:{
    id:string;
    label: string;
    required:boolean;
    type:ElementsType;
  }[] = [];

  const rows: Row[]=[];

  form.formSubmissions.forEach(submission => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt:submission.createAt,
    })
  })

  formElements.forEach(element =>{
    switch(element.type){
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.reruired,
          type:element.type
        });
        break;

        default:
          break;
    }
  })
    return (
      <>
        <h1 className='text-2xl font-bold my-4'>Submissions</h1>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {
                  columns.map((column) =>(
                    <TableHead className='uppercase' key={column.id}>{column.label}</TableHead>
                  ))
                }
                <TableHead className='text-muted-foreground text-right uppercase '>Submitted at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                rows.map((row,index) => (
                  <TableRow key={index}>
                    {
                      columns.map((column)=>(
                        <RowCell 
                          key={column.id}
                          type={column.type}
                          value={row[column.id]}
                        />
                      ))
                    }
                    <TableCell className='text-muted-foreground text-right'>
                      {formatDistance(row.submittedAt, new Date(),{
                        addSuffix:true,
                      })}
                    </TableCell>
                    </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </>
    )
}

function RowCell({type , value}:{type : ElementsType; value: string}){
  let node: ReactNode = value;

  switch(type){
    case "DateField":
      if(!value)return;
      const date = new Date(value);
      node = <Badge variant={"outline"}>{format(date,"dd/mm/yyyy")}</Badge>
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox checked={checked} disabled/>
      break;
  }

  return <TableCell>{node}</TableCell>;
}
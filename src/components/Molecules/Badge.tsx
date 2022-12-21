type Props = {
  label: string;
  wrapperClass?: string;
  labelClass?: string;
  onClick?: (props: any) => any;
};

export default function Badge({ label, wrapperClass, labelClass }: Props) {
  return (
    <div className={`${wrapperClass && wrapperClass}`}>
      <p className={`${labelClass && labelClass}`}>{label}</p>
    </div>
  );
}

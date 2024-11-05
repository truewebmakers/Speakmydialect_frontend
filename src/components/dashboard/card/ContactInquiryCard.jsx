import { CapitalizeFirstLetter } from "@/utils/helper";
import moment from "moment";

export default function ContactInquiryCard({ data }) {
  return (
    <tr>
      <th scope="row">
        <div>
          {data?.first_name
            ? CapitalizeFirstLetter(data?.first_name) +
              " " +
              CapitalizeFirstLetter(data?.last_name)
            : "-"}{" "}
        </div>
      </th>
      <td className="vam">{data?.email ? data?.email : "-"}</td>
      <td className="vam">{data?.phone ? data?.phone : "-"}</td>

      <td className="vam">
        {data?.subject ? CapitalizeFirstLetter(data?.subject) : "-"}
      </td>
      <td className="vam query-cell">
        {data?.query ? CapitalizeFirstLetter(data?.query) : "-"}
      </td>
      <td className="vam">
        {data?.created_at ? moment(data?.created_at).format("lll") : "-"}
      </td>
    </tr>
  );
}

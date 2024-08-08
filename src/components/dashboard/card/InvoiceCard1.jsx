import { CapitalizeFirstLetter } from "@/utils/helper";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export default function InvoiceCard1({ invoiceUrl, data }) {
  const url = invoiceUrl?.split('/0');
  const newUrl = url && (url[0] + '/' + data?.payouts[0]?.id)

  return (
    <>
      <tr>
        <th scope="row">
          <div>
            <span className="ms-3">{data?.job_title || '-'}
            </span>
          </div>
        </th>
        <td className="vam">{data?.translator?.fname + ' ' + data?.translator?.lname || '-'}</td>
        <td className="vam">{data?.translator?.email || '-'}</td>
        <td className="vam">{data?.present_rate || 0}</td>

        <td className="vam">
          <span
            className={`pending-style ${data?.payment_status
              === 'escrow' ? "style1" : ""} ${data?.payment_status === 'none' || data?.payment_status === 'dispute' ? "style3" : ""
              } ${data?.payment_status === 'not-paid' ? "style2" : ""}  ${data?.payment_status === 'paid' ? "style7" : ""}`}
          >
            {CapitalizeFirstLetter(data?.payment_status) || '-'}
          </span>
        </td>
        <td className="vam">
          <a className="table-action fz15 fw500 text-thm2" id="view" >
            {newUrl && invoiceUrl ?
              <>
                <Link to={newUrl
                } target="_blank" clickable className="ui-tooltip">
                  View
                </Link>
                <span className="flaticon-website me-2 vam" /></>
              :
              <span style={{ cursor: 'not-allowed' }}>No-Invoice {"  "}</span>}
          </a>
        </td>
      </tr>
    </>
  );
}

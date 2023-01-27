import { ExpandMore } from '@mui/icons-material'
import { NativeSelect, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PaymentMethodProps } from '../..'
import { getNetbankingBanks } from '../../../../API/handlers/payment.handler'

export default function NetBanking({ formValues: { register, formState: { errors }}, banks }: PaymentMethodProps) {
    // const banks = [
    //     "Abhyudaya Co-op Bank Ltd",
    //     "Abu Dhabi Commercial Bank",
    //     "Akola District Central Co-operative Bank",
    //     "Akola Janata Commercial Cooperative Bank",
    //     "Allahabad Bank",
    //     "Almora Urban Co-operative Bank Ltd.",
    //     "Andhra Bank",
    //     "Andhra Pragathi Grameena Bank",
    //     "Apna Sahakari Bank Ltd",
    //     "Australia And New Zealand Banking Group Limited.",
    //     "Axis Bank",
    //     "Bank Internasional Indonesia",
    //     "Bank Of America",
    //     "Bank Of Bahrain And Kuwait",
    //     "Bank Of Baroda",
    //     "Bank Of Ceylon",
    //     "Bank Of India",
    //     "Bank Of Maharashtra",
    //     "Bank Of Tokyo-mitsubishi Ufj Ltd.",
    //     "Barclays Bank Plc",
    //     "Bassein Catholic Co-op Bank Ltd",
    //     "Bharatiya Mahila Bank Limited",
    //     "Bnp Paribas",
    //     "Calyon Bank",
    //     "Canara Bank",
    //     "Capital Local Area Bank Ltd.",
    //     "Catholic Syrian Bank Ltd.",
    //     "Central Bank Of India",
    //     "Chinatrust Commercial Bank",
    //     "Citibank Na",
    //     "Citizencredit Co-operative Bank Ltd",
    //     "City Union Bank Ltd",
    //     "Commonwealth Bank Of Australia",
    //     "Corporation Bank",
    //     "Credit Suisse Ag",
    //     "Dbs Bank Ltd",
    //     "Dena Bank",
    //     "Deutsche Bank",
    //     "Deutsche Securities India Private Limited",
    //     "Development Credit Bank Limited",
    //     "Dhanlaxmi Bank Ltd",
    //     "Dicgc",
    //     "Dombivli Nagari Sahakari Bank Limited",
    //     "Firstrand Bank Limited",
    //     "Gopinath Patil Parsik Janata Sahakari Bank Ltd",
    //     "Gurgaon Gramin Bank",
    //     "Hdfc Bank Ltd",
    //     "Hsbc",
    //     "Icici Bank Ltd",
    //     "Idbi Bank Ltd",
    //     "Idrbt",
    //     "Indian Bank",
    //     "Indian Overseas Bank",
    //     "Indusind Bank Ltd",
    //     "Industrial And Commercial Bank Of China Limited",
    //     "Ing Vysya Bank Ltd",
    //     "Jalgaon Janata Sahkari Bank Ltd",
    //     "Janakalyan Sahakari Bank Ltd",
    //     "Janaseva Sahakari Bank (borivli) Ltd",
    //     "Janaseva Sahakari Bank Ltd. Pune",
    //     "Janata Sahakari Bank Ltd (pune)",
    //     "Jpmorgan Chase Bank N.a",
    //     "Kallappanna Awade Ich Janata S Bank",
    //     "Kapol Co Op Bank",
    //     "Karnataka Bank Ltd",
    //     "Karnataka Vikas Grameena Bank",
    //     "Karur Vysya Bank",
    //     "Kotak Mahindra Bank",
    //     "Kurmanchal Nagar Sahkari Bank Ltd",
    //     "Mahanagar Co-op Bank Ltd",
    //     "Maharashtra State Co Operative Bank",
    //     "Mashreqbank Psc",
    //     "Mizuho Corporate Bank Ltd",
    //     "Mumbai District Central Co-op. Bank Ltd.",
    //     "Nagpur Nagrik Sahakari Bank Ltd",
    //     "National Australia Bank",
    //     "New India Co-operative Bank Ltd.",
    //     "Nkgsb Co-op Bank Ltd",
    //     "North Malabar Gramin Bank",
    //     "Nutan Nagarik Sahakari Bank Ltd",
    //     "Oman International Bank Saog",
    //     "Oriental Bank Of Commerce",
    //     "Parsik Janata Sahakari Bank Ltd",
    //     "Prathama Bank",
    //     "Prime Co Operative Bank Ltd",
    //     "Punjab And Maharashtra Co-op Bank Ltd.",
    //     "Punjab And Sind Bank",
    //     "Punjab National Bank",
    //     "Rabobank International (ccrb)",
    //     "Rajgurunagar Sahakari Bank Ltd.",
    //     "Rajkot Nagarik Sahakari Bank Ltd",
    //     "Reserve Bank Of India",
    //     "Sberbank",
    //     "Shinhan Bank",
    //     "Shri Chhatrapati Rajarshi Shahu Urban Co-op Bank Ltd",
    //     "Societe Generale",
    //     "Solapur Janata Sahkari Bank Ltd.solapur",
    //     "South Indian Bank",
    //     "Standard Chartered Bank",
    //     "State Bank Of Bikaner And Jaipur",
    //     "State Bank Of Hyderabad",
    //     "State Bank Of India",
    //     "State Bank Of Mauritius Ltd",
    //     "State Bank Of Mysore",
    //     "State Bank Of Patiala",
    //     "State Bank Of Travancore",
    //     "Sumitomo Mitsui Banking Corporation",
    //     "Syndicate Bank",
    //     "Tamilnad Mercantile Bank Ltd",
    //     "Thane Bharat Sahakari Bank Ltd",
    //     "The A.p. Mahesh Co-op Urban Bank Ltd.",
    //     "The Ahmedabad Mercantile Co-operative Bank Ltd.",
    //     "The Andhra Pradesh State Coop Bank Ltd",
    //     "The Bank Of Nova Scotia",
    //     "The Bank Of Rajasthan Ltd",
    //     "The Bharat Co-operative Bank (mumbai) Ltd",
    //     "The Cosmos Co-operative Bank Ltd.",
    //     "The Delhi State Cooperative Bank Ltd.",
    //     "The Federal Bank Ltd",
    //     "The Gadchiroli District Central Cooperative Bank Ltd",
    //     "The Greater Bombay Co-op. Bank Ltd",
    //     "The Gujarat State Co-operative Bank Ltd",
    //     "The Jalgaon Peoples Co-op Bank",
    //     "The Jammu And Kashmir Bank Ltd",
    //     "The Kalupur Commercial Co. Op. Bank Ltd.",
    //     "The Kalyan Janata Sahakari Bank Ltd.",
    //     "The Kangra Central Co-operative Bank Ltd",
    //     "The Kangra Cooperative Bank Ltd",
    //     "The Karad Urban Co-op Bank Ltd",
    //     "The Karnataka State Apex Coop. Bank Ltd.",
    //     "The Lakshmi Vilas Bank Ltd",
    //     "The Mehsana Urban Cooperative Bank Ltd",
    //     "The Municipal Co Operative Bank Ltd Mumbai",
    //     "The Nainital Bank Limited",
    //     "The Nasik Merchants Co-op Bank Ltd. Nashik",
    //     "The Rajasthan State Cooperative Bank Ltd.",
    //     "The Ratnakar Bank Ltd",
    //     "The Royal Bank Of Scotland N.v",
    //     "The Sahebrao Deshmukh Co-op. Bank Ltd.",
    //     "The Saraswat Co-operative Bank Ltd",
    //     "The Seva Vikas Co-operative Bank Ltd (svb)",
    //     "The Shamrao Vithal Co-operative Bank Ltd",
    //     "The Surat District Co Operative Bank Ltd.",
    //     "The Surat Peoples Co-op Bank Ltd",
    //     "The Sutex Co.op. Bank Ltd.",
    //     "The Tamilnadu State Apex Cooperative Bank Limited",
    //     "The Thane District Central Co-op Bank Ltd",
    //     "The Thane Janata Sahakari Bank Ltd",
    //     "The Varachha Co-op. Bank Ltd.",
    //     "The Vishweshwar Sahakari Bank Ltd. Pune",
    //     "The West Bengal State Cooperative Bank Ltd",
    //     "Tjsb Sahakari Bank Ltd.",
    //     "Tumkur Grain Merchants Cooperative Bank Ltd.",
    //     "Ubs Ag",
    //     "Uco Bank",
    //     "Union Bank Of India",
    //     "United Bank Of India",
    //     "United Overseas Bank",
    //     "Vasai Vikas Sahakari Bank Ltd.",
    //     "Vijaya Bank",
    //     "West Bengal State Cooperative Bank",
    //     "Westpac Banking Corporation",
    //     "Woori Bank",
    //     "Yes Bank Ltd",
    //     "Zila Sahkari Bank Ltd Ghaziabad"
    // ]

    // const [banks, setBanks] = useState<{ [bank: string]: string }>()

    return (
        <Stack
            sx={{
                py: 4,
                px: 2
            }}
            spacing={2}
        >
            <Typography>
                In order to complete your transaction, we will transfer you over to Razorpay's secure servers.
            </Typography>
            <Stack
                spacing={0.5}
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                    sx={{
                        border: theme => `1px solid ${!!errors.bank ? theme.palette.error.main : theme.palette.common.black}`,
                        py: 1,
                        px: 1.5,
                        width: '100%',
                        transition: '0.3s all ease',
                        "&:hover": {
                            background: 'rgba(0,0,0,0.04)'
                        }
                    }}
                >
                    <NativeSelect
                        fullWidth
                        IconComponent={() => null}
                        id='sort-by'
                        error={!!errors.bank}
                        disableUnderline
                        inputProps={{
                            sx: {
                                "&:focus": {
                                    background: 'none'
                                }
                            },
                        }}
                        defaultValue='disabled'
                        {...register('bank', {
                            validate: (value) => value !== 'disabled' || 'Please select a bank',
                        })}
                    >
                        <option
                            disabled
                            value='disabled'
                        >
                            Please select...
                        </option>
                        {banks && Object.keys(banks).map(key => {
                            const item = banks[key]
                            return (
                                <option
                                    value={key}
                                >
                                    {item}
                                </option>
                            )
                        })}
                    </NativeSelect>
                    <ExpandMore />
                </Stack>
                <Typography
                    variant='caption'
                    sx={{
                        color: theme => theme.palette.error.main
                    }}
                >
                    {errors.bank?.message?.toString()}
                </Typography>
            </Stack>
        </Stack>
    )
}

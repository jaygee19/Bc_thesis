<?php

namespace App\Imports;

use App\Models\ComparedPair;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\SubmittedAssignment;

class ComparedPairsImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $vysledok = str_getcsv($row[0], ';');
        $first = SubmittedAssignment::where('path_to_file', "public/uploads/".$vysledok[0])->first();
        $second = SubmittedAssignment::where('path_to_file', "public/uploads/".$vysledok[2])->first();
        return new ComparedPair([
            'assignment_first_id' => $first->assignment_id,
            'assignment_second_id' => $second->assignment_id,
            'percentage_match' => $vysledok[3],
        ]);
    }
}

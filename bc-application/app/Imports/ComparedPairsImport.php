<?php

namespace App\Imports;

use App\Models\ComparedPair;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\SubmittedAssignment;

class ComparedPairsImport implements ToModel
{
    public function __construct($type, $id)
    {
        $this->type = $type;
        $this->id = $id;
    }
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $vysledok = str_getcsv($row[0], ';');

        if($this->type == 'second_check') {
        $first = SubmittedAssignment::where('path_to_file', "public/".$this->type.'/'.$this->id.'/'.$vysledok[0])->first();
        $second = SubmittedAssignment::where('path_to_file', "public/".$this->type.'/'.$this->id.'/'.$vysledok[2])->first();
        } else {
        $first = SubmittedAssignment::where('assignment_id', $vysledok[0])->first();
        $second = SubmittedAssignment::where('assignment_id', $vysledok[2])->first();
        }

        return new ComparedPair([
            'assignment_first_id' => $first->assignment_id,
            'assignment_second_id' => $second->assignment_id,
            'percentage_match' => $vysledok[3],
        ]);
    }
}
